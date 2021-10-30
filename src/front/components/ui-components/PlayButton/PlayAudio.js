/* global Audio */

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Import styles
 */
import './PlayAudio.scss';

/**
 * The play button
 *
 * @param {Object} props     The component props
 * @param {string} props.url The audio URL
 * @return {JSX} The play button code
 */
const PlayAudio = ( { url } ) => {
	// Store the audio element in the state
	const [ audio ] = useState( new Audio( url ) );

	// Store audio playing state
	const [ playingAudio, setPlayingAudio ] = useState( false );

	// On mount, add event listener to set playing as false when audio ends, and on unmount
	// remove event listener
	useEffect( () => {
		audio.addEventListener( 'ended', () => setPlayingAudio( false ) );

		return () => {
			audio.removeEventListener( 'ended', () =>
				setPlayingAudio( false )
			);
		};
	}, [] );

	// Play/pause audio depending on state
	useEffect( () => {
		if ( true === playingAudio ) {
			audio.play();
		} else {
			audio.pause();
		}
	}, [ playingAudio ] );

	/**
	 * Toggles the audio player
	 *
	 * @return { void }
	 */
	const toggleAudio = () => {
		setPlayingAudio( ! playingAudio );
	};

	return (
		<button
			className="speecheck__playbutton"
			onClick={ () => toggleAudio() }
		>
			{ playingAudio ? (
				<span className="material-icons">pause_circle</span>
			) : (
				<span className="material-icons">play_circle_filled</span>
			) }
		</button>
	);
};

export default PlayAudio;
