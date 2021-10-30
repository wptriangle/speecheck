/**
 * Import styles
 */
import './Loader.scss';

/**
 * The main component
 *
 * @return {JSX} The main component code
 */
const Loader = () => {
	return (
		<div className="speecheck__loader">
			<span className="speecheck-loading-icon material-icons">
				autorenew
			</span>
		</div>
	);
};

export default Loader;
