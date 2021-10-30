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
 * @param {string} props.label     The section label
 *
 * @return {JSX} The section component code
 */
const Section = ( { className, children, label } ) => {
	return (
		<div
			className={ classNames( 'speecheck__section', {
				[ className ]: isSet( className ),
			} ) }
		>
			{ isSet( label ) && (
				<div className="speecheck__section__label">
					<span>{ label }</span>
				</div>
			) }
			<div className="speecheck__section__content">{ children }</div>
		</div>
	);
};

export default Section;
