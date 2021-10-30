/**
 * Internal dependencies
 */
import InstructorMaterials from '../../ui-sections/InstructorMaterials/InstructorMaterials';
import Actions from '../../ui-sections/Actions/Actions';

/**
 * Import styles
 */
import './Speecheck.scss';

/**
 * The main component
 *
 * @return {JSX} The main component code
 */
const Speecheck = () => {
	return (
		<div className="speecheck__container">
			<div className="speecheck__content">
				<InstructorMaterials />
				<Actions />
			</div>
		</div>
	);
};

export default Speecheck;
