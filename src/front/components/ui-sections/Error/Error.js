/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Section from '../../ui-components/Section/Section';

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
	// If autoClose is on, close the error after 30 seconds
	useEffect( () => {
		if ( ! autoClose ) {
			return;
		}

		setTimeout( () => closeError(), 30000 );
	}, [] );

	return (
		<Section
			className="speecheck__error"
			label={ __( 'Error', 'speecheck' ) }
		>
			<p>{ error }</p>
		</Section>
	);
};

export default Error;
