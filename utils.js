import {useMemo} from 'react';

import validator from './validator';

export const runValidations = (fields, validators) => {
  let errors = [];
  let args, msg, fieldValidators;
  for(let fKey in fields){
    fieldValidators = validators[fKey];
    for(let vKey in fieldValidators){
      args = [].concat(fieldValidators[vKey].args);
      if( !validator[vKey](...[fields[fKey], ...args]) ){ 
        msg = fieldValidators[vKey].msg || 'There was a problem';
        errors.push({path: fKey, message: msg});
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



export const nthChildTest = (conditionsInOrder) => {
  const ordinals = {};
  const index = 1; // first-child == 1
  for (key in conditions) {
    if(conditionsInOrder[key]){
      ordinals[key] = index;
      index++;
    }
  }
  return ordinals
}