/* global FileReader */

/**
 * Check if a variable is set
 *
 * @param {any} variable The variable to check
 *
 * @return {boolean} If the variable is set
 */
export const isSet = ( variable ) => {
	return variable !== undefined && variable !== null && variable !== false;
};

/**
 * Convert a blob to base64
 *
 * @param {blob}     blob       The blob to convert
 * @param {Function} callbackFn The function to run after conversion
 *
 * @return {void}
 */
export const convertToBase64 = ( blob, callbackFn = () => {} ) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		callbackFn( reader.result.split( ',' )[ 1 ] );
	};

	// Conversion
	reader.readAsDataURL( blob );
};
