/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Import styles
 */
import './Error.scss';

/**
 * The error component
 *
 * @param {Object}   props            The component props
 * @param {string}   props.error      The error text
 * @param {Function} props.closeError Close the error
 * @param {boolean}  props.autoClose  If the error should auto close
 * @return {JSX} The error component code
 */
const Error = ( { error, closeError = () => {}, autoClose = true } ) => {
	useEffect( () => {
		if ( ! autoClose ) {
			return;
		}

		setTimeout( () => closeError(), 30000 );
	}, [] );

	return (
		<div className="speecheck__error">
			<p>{ error }</p>
		</div>
	);
};

export default Error;
