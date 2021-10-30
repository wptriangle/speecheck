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
import './Button.scss';

/**
 * The button
 *
 * @param {Object}   props          The component props
 * @param {Object}   props.children The button text
 * @param {string}   props.state    The button state
 * @param {string}   props.icon     The button icon
 * @param {Function} props.onClick  On button click
 *
 * @return {JSX} The button code
 */
const Button = ( {
	children,
	state = 'primary',
	icon,
	onClick = () => {},
	iconAnimation = false,
} ) => {
	return (
		<button
			className={ classNames( 'speecheck__button', {
				[ `speecheck__button--${ state }` ]: isSet( state ),
			} ) }
			onClick={ onClick }
		>
			{ icon && (
				<span
					className={ classNames(
						'speecheck__button__icon material-icons',
						{
							[ `speecheck__button__icon--${ iconAnimation }` ]: isSet(
								iconAnimation
							),
						}
					) }
				>
					{ icon }
				</span>
			) }
			{ children }
		</button>
	);
};

export default Button;
