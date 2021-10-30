/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../../ui-components/Button/Button';

import { Recorder } from '../../../helpers/recorder';

/**
 * Import styles
 */
import './Actions.scss';
import { isSet } from '../../../helpers/common';

/**
 * The actions
 *
 * @return {JSX} The actions code
 */
const Actions = () => {
	const [ recorder ] = useState( new Recorder() );
	const [ isRecording, setIsRecording ] = useState( false );
	const [ recording, setRecording ] = useState( false );

	useEffect( () => {
		recorder.on( 'start', () => setIsRecording( true ) );
		recorder.on( 'stop', ( blob ) => {
			setIsRecording( false );
			setRecording( blob );
		} );
	}, [] );

	return (
		<div className="speecheck__actions">
			{ isRecording ? (
				<Button
					icon="stop"
					state="danger"
					onClick={ () => {
						recorder.stopRecording();
					} }
				>
					{ __( 'Stop', 'speecheck' ) }
				</Button>
			) : (
				<>
					<Button
						icon="mic"
						onClick={ () => {
							recorder.startRecording();
						} }
					>
						{ isSet( recording )
							? __( 'Record Again', 'speecheck' )
							: __( 'Record', 'speecheck' ) }
					</Button>
					{ isSet( recording ) && (
						<Button
							icon="check_circle"
							onClick={ () => {} }
							state="good"
						>
							{ __( 'Submit', 'speecheck' ) }
						</Button>
					) }
				</>
			) }
		</div>
	);
};

export default Actions;
