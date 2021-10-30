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
} ) => {
	return (
		<button
			className={ `speecheck__button speecheck__button--${ state }` }
			onClick={ onClick }
		>
			{ icon && <span className="material-icons">{ icon }</span> }
			{ children }
		</button>
	);
};

export default Button;
