import { useCallback, useEffect, useRef, useState } from 'react';

const EMPTY_FIELDS = {};
const EMPTY_ERRORS = {};
const noop = () => {};

/**
 * Small form state hook for field values, errors, loading, and live updates.
 * 
 * This hook centralizes form state management and provides utilities for handling
 * field values, errors, loading states, and change notifications. It includes
 * debounced change handling and Feathers.js error conversion for API integration.
 * 
 * @param {Object} opts - Configuration options
 * @param {Object} [opts.initialFields={}] - Initial field values
 * @param {Function} [opts.onChange] - Callback fired after fields change (debounced; not on initial mount)
 * @param {number} [opts.onChangeDelay=100] - Debounce delay in milliseconds
 * @param {Object} [opts.toastableErrors={}] - Error messages to show as toasts
 * @param {Function} [opts.addToast] - Toast notification function
 * 
 * @returns {Object} Form state and management functions
 * @returns {Object} returns.fields - Current field values
 * @returns {Function} returns.setFieldValue - Set single field value
 * @returns {Function} returns.getFieldValue - Get single field value
 * @returns {Function} returns.setFieldValues - Set multiple field values
 * @returns {Function} returns.replaceFields - Replace the complete field object
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
 *         onChange={(event) => setFieldValue('email', event.target.value)}
 *         placeholder="Email"
 *       />
 *       <FieldError error={error.fieldErrors?.email} />
 *       
 *       <TextInput
 *         value={getFieldValue('password')}
 *         onChange={(event) => setFieldValue('password', event.target.value)}
 *         placeholder="Password"
 *         secureTextEntry
 *       />
 *       <FieldError error={error.fieldErrors?.password} />
 *       
 *       <Button onPress={handleSubmit} isLoading={loading}>
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
 *         onChange={(event) => formState.setFieldValue('name', event.target.value)}
 *         placeholder="Your name"
 *       />
 *       
 *       <TextInput
 *         value={formState.getFieldValue('email')}
 *         onChange={(event) => formState.setFieldValue('email', event.target.value)}
 *         placeholder="Email address"
 *       />
 *       
 *       <TextInput
 *         value={formState.getFieldValue('message')}
 *         onChange={(event) => formState.setFieldValue('message', event.target.value)}
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
		initialFields = EMPTY_FIELDS,
		onChange = noop,
		onChangeDelay = 100,
		toastableErrors = EMPTY_ERRORS,
		addToast = noop
	} = opts;
	
	const initialFieldsRef = useRef(initialFields);
	const onChangeRef = useRef(onChange);
	const addToastRef = useRef(addToast);
	const toastableErrorsRef = useRef(toastableErrors);
	const didMountRef = useRef(false);
	const [fields, setFields] = useState(initialFields);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		addToastRef.current = addToast;
		toastableErrorsRef.current = toastableErrors;
	}, [addToast, toastableErrors]);

	useEffect(() => {
		if(!didMountRef.current){
			didMountRef.current = true;
			return;
		}

		const timeout = setTimeout(() => {
			onChangeRef.current(fields);
		}, onChangeDelay);

		return () => clearTimeout(timeout);
	}, [fields, onChangeDelay]);

	const [loading, setLoading] = useState(false);
	const [error, setErrorDirect] = useState({});
	const setError = useCallback((nextError = {}) => {
		setErrorDirect(convertFeathersErrors(nextError));
	}, []);

	// watch for toastable errors 
	useEffect(()=>{
		const message = error?.message || toastableErrorsRef.current[error?.name] || false;
		if(message){
			addToastRef.current(message);
		}
	}, [error]);

	const setFieldValue = useCallback((key, value) => {
		setFields(currentFields => ({...currentFields, [key]: value}));
	}, []);

	const getFieldValue = (key) => {
		return fields[key] ?? '';
	}

	const setFieldValues = useCallback((updatedFields={}) => {
		setFields(currentFields => ({...currentFields, ...updatedFields}));
	}, []);

	const replaceFields = useCallback((nextFields={}) => {
		setFields(nextFields);
	}, []);

	const resetFields = useCallback(() => {
		setFields(initialFieldsRef.current);
	}, []);

	return {
		resetFields,
		replaceFields,
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
