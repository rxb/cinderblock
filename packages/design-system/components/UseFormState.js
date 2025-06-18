import React, { useEffect, useState } from 'react';

/**
 * Form state management hook that provides comprehensive form handling capabilities.
 * Handles field values, validation errors, loading states, and real-time updates.
 * 
 * This hook centralizes form state management and provides utilities for handling
 * field values, errors, loading states, and change notifications. It includes
 * debounced change handling and Feathers.js error conversion for API integration.
 * 
 * @param {Object} opts - Configuration options
 * @param {Object} [opts.initialFields={}] - Initial field values
 * @param {Function} [opts.onChange] - Callback fired when fields change (debounced)
 * @param {Object} [opts.toastableErrors={}] - Error messages to show as toasts
 * @param {Function} [opts.addToast] - Toast notification function
 * 
 * @returns {Object} Form state and management functions
 * @returns {Object} returns.fields - Current field values
 * @returns {Function} returns.setFieldValue - Set single field value
 * @returns {Function} returns.getFieldValue - Get single field value
 * @returns {Function} returns.setFieldValues - Set multiple field values
 * @returns {Function} returns.resetFields - Reset to initial values
 * @returns {boolean} returns.loading - Loading state
 * @returns {Function} returns.setLoading - Set loading state
 * @returns {Object} returns.error - Current error state
 * @returns {Function} returns.setError - Set error state
 * 
 * @example
 * // Basic form with validation
 * function LoginForm() {
 *   const {
 *     fields,
 *     setFieldValue,
 *     getFieldValue,
 *     setError,
 *     error,
 *     loading,
 *     setLoading
 *   } = useFormState({
 *     initialFields: { email: '', password: '' },
 *     onChange: (fields) => {
 *       // Real-time validation or auto-save
 *       console.log('Form changed:', fields);
 *     }
 *   });
 * 
 *   const handleSubmit = async () => {
 *     setLoading(true);
 *     try {
 *       await api.login(fields);
 *     } catch (err) {
 *       setError(err); // Automatically converts Feathers errors
 *     }
 *     setLoading(false);
 *   };
 * 
 *   return (
 *     <Section>
 *       <TextInput
 *         value={getFieldValue('email')}
 *         onChange={(value) => setFieldValue('email', value)}
 *         placeholder="Email"
 *       />
 *       <FieldError error={error.fieldErrors?.email} />
 *       
 *       <TextInput
 *         value={getFieldValue('password')}
 *         onChange={(value) => setFieldValue('password', value)}
 *         placeholder="Password"
 *         secureTextEntry
 *       />
 *       <FieldError error={error.fieldErrors?.password} />
 *       
 *       <Button onPress={handleSubmit} loading={loading}>
 *         Sign In
 *       </Button>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Form with toast notifications
 * function ContactForm() {
 *   const { addToast } = useToaster();
 *   
 *   const formState = useFormState({
 *     initialFields: { name: '', email: '', message: '' },
 *     toastableErrors: {
 *       'validation-failed': 'Please check your inputs',
 *       'rate-limited': 'Too many requests. Please try again later.'
 *     },
 *     addToast,
 *     onChange: (fields) => {
 *       // Auto-save draft to localStorage
 *       localStorage.setItem('contact-draft', JSON.stringify(fields));
 *     }
 *   });
 * 
 *   return (
 *     <Section>
 *       <TextInput
 *         value={formState.getFieldValue('name')}
 *         onChange={(value) => formState.setFieldValue('name', value)}
 *         placeholder="Your name"
 *       />
 *       
 *       <TextInput
 *         value={formState.getFieldValue('email')}
 *         onChange={(value) => formState.setFieldValue('email', value)}
 *         placeholder="Email address"
 *       />
 *       
 *       <TextInput
 *         value={formState.getFieldValue('message')}
 *         onChange={(value) => formState.setFieldValue('message', value)}
 *         placeholder="Your message"
 *         multiline
 *       />
 *       
 *       <Button onPress={handleSubmit}>Send Message</Button>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Multi-step form with field management
 * function MultiStepForm() {
 *   const [step, setStep] = useState(1);
 *   
 *   const formState = useFormState({
 *     initialFields: {
 *       // Step 1: Personal info
 *       firstName: '', lastName: '', email: '',
 *       // Step 2: Address
 *       street: '', city: '', zipCode: '',
 *       // Step 3: Preferences
 *       newsletter: false, notifications: true
 *     }
 *   });
 * 
 *   const nextStep = () => {
 *     // Validate current step before proceeding
 *     if (validateStep(step, formState.fields)) {
 *       setStep(step + 1);
 *     }
 *   };
 * 
 *   const updateMultipleFields = (updates) => {
 *     formState.setFieldValues(updates);
 *   };
 * 
 *   return (
 *     <Section>
 *       {step === 1 && <PersonalInfoStep formState={formState} />}
 *       {step === 2 && <AddressStep formState={formState} />}
 *       {step === 3 && <PreferencesStep formState={formState} />}
 *       
 *       <Button onPress={nextStep}>
 *         {step < 3 ? 'Next' : 'Submit'}
 *       </Button>
 *     </Section>
 *   );
 * }
 */


/**
 * Debounce utility function to limit the rate of function calls.
 * Delays execution until after a specified time has passed since the last call.
 * 
 * @param {Function} callback - Function to debounce
 * @param {number} [time=60] - Delay time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(callback, time = 60) {
	var timeout;
	return function() {
		var context = this;
		var args = arguments;
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			timeout = null;
			callback.apply(context, args);
		}, time);
	}
}

/**
 * Converts Feathers.js API errors to a more usable format for form validation.
 * Transforms validation errors into a fieldErrors object for easy field mapping.
 * 
 * @param {Object} originalError - Raw error from Feathers.js API
 * @returns {Object} Processed error with fieldErrors mapping
 * 
 * @example
 * // Raw Feathers error:
 * {
 *   name: 'BadRequest',
 *   message: 'Validation failed',
 *   errors: [
 *     { path: 'email', message: 'Email is required' },
 *     { path: 'password', message: 'Password must be at least 8 characters' }
 *   ]
 * }
 * 
 * // Converted error:
 * {
 *   name: 'BadRequest',
 *   message: 'Validation failed',
 *   errors: [...],
 *   fieldErrors: {
 *     email: 'Email is required',
 *     password: 'Password must be at least 8 characters'
 *   }
 * }
 */
const convertFeathersErrors = (originalError) => {
	let error = {...originalError};
   if(error.errors && error.errors.length){
      error.fieldErrors = Object.assign({}, ...error.errors.map(err => ({[err.path]: err.message})));
   }
   return error;
}


const useFormState = ( opts = {} ) => {

	const {
		initialFields = {},
		onChange = () => {},
		toastableErrors = {},
		addToast = (message) => {console.error(message) }
	} = opts;
	
	const [fields, setFields] = useState(initialFields);
	useEffect( ()=>{ handleChange() }, [fields]);

	const [loading, setLoading] = useState(false);
	const [error, setErrorDirect] = useState({timestamp: Date.now()});
	const setError = (error = {}) => setErrorDirect(convertFeathersErrors(error));

	// watch for toastable errors 
	useEffect(()=>{
		const message = error?.message || toastableErrors[error?.name] || false;
		if(message){
			addToast(message);
		}
	}, [error]);

	const setFieldValue = (key, value) => {
		const newFields = {...fields, [key]: value};
		setFields(newFields);
	}

	const getFieldValue = (key) => {
		return fields[key] || '';
	}

	const setFieldValues = (updatedFields={}) => {
		const newFields = {...fields, ...updatedFields};
		setFields(newFields);
	}

	const resetFields = () => {
		setFields(initialFields);
	}

	const handleChange = debounce(() => {
		// PURPOSE: when elements outside the form need to know what's happening in the form as fields are being edited, before submit
		onChange(fields, this);
	}, 100);

	return {
		resetFields,
		setFieldValue,
		getFieldValue,
		setFieldValues,
		setLoading,
		loading,
		setError,
		error,
		fields
	}
}

export default useFormState;