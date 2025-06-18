/**
 * Cinderblock Design System - Core Utilities
 * 
 * This file contains the core responsive system utilities that power Cinderblock's
 * sophisticated component abstraction layer. The system works as follows:
 * 
 * 1. COMPONENT PROPS → CSS CLASSES
 *    Components accept responsive props like { small: 'linear', large: 'grid' }
 *    These get converted to CSS class names via getStyleKeysForMediaQueryVariants()
 * 
 * 2. CSS CLASSES → ACTIVE STYLES  
 *    Class names get resolved to actual styles and media query IDs via getActiveStyles()
 *    This bridges the gap between component props and CSS-in-JS/media queries
 * 
 * 3. RESPONSIVE VALUE RESOLUTION
 *    findWidestActiveValue() determines which variant is active based on screen size
 *    Uses mobile-first approach where larger breakpoints override smaller ones
 * 
 * 4. AUTOMATIC MEDIA QUERY APPLICATION
 *    Components automatically apply dataSet={{ media: activeIds }} for responsive behavior
 *    Developers use clean component APIs instead of manual media query utilities
 * 
 * This abstraction allows for elegant component APIs like:
 *   <Flex switchDirection="large">        // Switches direction at large breakpoint  
 *   <List variant={{ small: 'linear', large: 'grid' }} />  // Responsive layout
 *   <Button variant={{ small: 'grow', large: 'shrink' }} /> // Responsive sizing
 */

import {useMemo} from 'react';

import validator from './validator';

export const runValidations = (fields, validators) => {
  let errors = [];
  let args, msg, fieldValidators, fieldOther;
  for(let fKey in fields){
    if(validators[fKey]){
      if(validators[fKey].validate){
        // allow copying whole model into client-side validation
        // also supports "allowNull"
        const {validate, ...other} = validators[fKey].validate;
        fieldValidators = validate;
        fieldOther = other;
      }
      else{
        // if not, it's the simple object format
        fieldValidators = validators[fKey];
        fieldOther = {};
      }
      if( !(fieldOther.allowNull && !fields[fKey]) ){ // don't validate when empty and null is allowed
        for(let vKey in fieldValidators){
          args = [].concat(fieldValidators[vKey].args);
          if( !validator[vKey](...[fields[fKey], ...args]) ){ 
            msg = fieldValidators[vKey].msg || 'There was a problem';
            errors.push({path: fKey, message: msg});
          }
        }  
      }
    }
  }
  return (errors.length) ? {name: 'BadRequest', errors} : false;
}

export const pushError = (errorObj, fKey, msg) =>{
  const errors = errorObj.errors || [];
  errors.push({path: fKey, message: msg})
  return {name: 'BadRequest', errors};
}

export const readFileAsDataUrl = (inputFile) => {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};


import { BREAKPOINT_SIZES } from './styles/designConstants';
const BREAKPOINTS = Object.keys(BREAKPOINT_SIZES);

/**
 * Finds the widest (largest) active breakpoint value from a responsive prop object.
 * Uses mobile-first approach - starts with 'small' and overrides with larger breakpoints.
 * 
 * @param {Object|*} values - Responsive values object like { small: 'linear', large: 'grid' } 
 *                           or single value that gets applied to 'small'
 * @param {Object} media - Current media query state from useMediaContext()
 * @returns {*} The active value for the current screen size
 * 
 * @example
 * // Input: { small: 'linear', large: 'grid' }, media: { small: true, large: true }
 * // Output: 'grid' (largest active breakpoint wins)
 * 
 * // Input: 'linear', media: { small: true }  
 * // Output: 'linear' (single value becomes { small: 'linear' })
 */
export const findWidestActiveValue = (values, media) => {
	const fwav = (values, media) => {
		let valuesMap = (typeof values === 'object') ? values : { small: values }
		let activeValue = valuesMap['small'];
		BREAKPOINTS.forEach( BP => {
			if( valuesMap[BP] && media[BP] ){
				activeValue = valuesMap[BP];
			}
		});
		return activeValue;
	}
	return useMemo(() => fwav(values, media), [values, media]);
}

/**
 * Converts an array of CSS class names into active styles and media query IDs.
 * This is the core function that bridges component props to actual CSS classes.
 * 
 * @param {string[]} styleKeys - Array of CSS class names to activate
 * @param {Object} styles - Style object from ThemeContext (CSS-in-JS styles)
 * @param {Object} ids - Media query ID object from ThemeContext  
 * @returns {Object} Object with activeStyles array and activeIds string
 * 
 * @example
 * // Input: ['flex', 'flex--row', 'flex--row__large']
 * // Output: { 
 * //   activeStyles: [styles.flex, styles['flex--row'], styles['flex--row__large']],
 * //   activeIds: 'flex flex--row flex--row__large' 
 * // }
 * 
 * // The activeStyles get applied to the component's style prop
 * // The activeIds get applied to dataSet.media for responsive behavior
 */
export const getActiveStyles = (styleKeys, styles, ids) => {
	return{ 
		activeStyles: styleKeys.map((key)=>{
			return styles[key];
		}),
		activeIds: styleKeys.map((key)=>{
			return ids[key];
		}).join(' ')
	};
}

/**
 * Generates CSS class names for responsive component variants across all breakpoints.
 * This is the core responsive system function - it converts component props like 
 * { small: 'linear', large: 'grid' } into CSS classes like 'list--linear__small', 'list--grid__large'.
 * 
 * Uses mobile-first approach: missing breakpoints inherit from the previous smaller breakpoint.
 * 
 * @param {string} baseKey - CSS class prefix (e.g., 'list--', 'flex--', 'button--')
 * @param {Object|string} variant - Responsive variant object or single value
 * @returns {string[]} Array of CSS class names for all breakpoints
 * 
 * @example
 * // Input: 'list--', { small: 'linear', large: 'grid' }
 * // Output: ['list--linear__small', 'list--linear__medium', 'list--grid__large', 'list--grid__xlarge']
 * //         ↑ small: linear    ↑ inherits linear    ↑ large: grid    ↑ inherits grid
 * 
 * // Input: 'button--', 'primary'  
 * // Output: ['button--primary__small', 'button--primary__medium', 'button--primary__large', ...]
 * //         ↑ single value applied to all breakpoints
 * 
 * // The CSS classes contain media queries that activate at their respective breakpoints
 */
export const getStyleKeysForMediaQueryVariants = (baseKey, variant) => {
  const firstBreakpointKey = Object.keys(BREAKPOINT_SIZES)[0];
  let variantObj = (typeof variant === 'object') ? variant : { [firstBreakpointKey]: variant }
  let lastActiveVariant = variantObj[firstBreakpointKey] || '';
  return Object.keys(BREAKPOINT_SIZES).map( key => {
    lastActiveVariant = variantObj[key] || lastActiveVariant;
    return `${baseKey}${lastActiveVariant}__${key}`;
  });
}

export const nthChildTest = (conditionsInOrder) => {
  const ordinals = {};
  let index = 1; // first-child == 1
  for (key in conditions) {
    if(conditionsInOrder[key]){
      ordinals[key] = index;
      index++;
    }
  }
  return ordinals
}