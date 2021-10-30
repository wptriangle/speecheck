/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';

/**
 * Get previous value of a variable
 *
 * @param {any} value The variable to get
 *
 * @return {any} The previous value
 */
export const usePrevious = ( value ) => {
	const ref = useRef();

	useEffect( () => {
		ref.current = value;
	} );

	return ref?.current;
};
