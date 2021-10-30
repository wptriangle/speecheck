/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { isSet } from '../../../../helpers/common';

/**
 * Import styles
 */
import './Section.scss';

/**
 * The section component
 *
 * @param {Object} props           The component props
 * @param {string} props.className Custom class
 * @param {Object} props.children  Section children
 *
 * @return {JSX} The section component code
 */
const Section = ( { className, children } ) => {
	return (
		<div
			className={ classNames( 'speecheck__section', {
				[ className ]: isSet( className ),
			} ) }
		>
			{ children }
		</div>
	);
};

export default Section;
