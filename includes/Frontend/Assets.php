<?php
namespace Speecheck\Frontend;

/*
 * The plugin assets class
 */
class Assets {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'load_frontend_scripts' ] );
	}

	/**
	 * Enqueue front-end scripts/styles
	 *
	 * @return void
	 */
	public function load_frontend_scripts() {
		// Plugin styles
		wp_enqueue_style(
			'speecheck',
			SPEECHECK_URL . '/assets/css/main.css',
			[],
			SPEECHECK_VERSION
		);

		// Roboto font
		wp_enqueue_style(
			'speecheck-google-fonts',
			'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
		);

		// Material design icons
		wp_enqueue_style(
			'speecheck-material-icons',
			'https://fonts.googleapis.com/icon?family=Material+Icons'
		);

		// Recorder.js
		wp_enqueue_script(
			'speecheck-recorder',
			'https://cdn.jsdelivr.net/gh/mattdiamond/Recorderjs@08e7abd99739be6946f19f6806ccb368138f2dd3/dist/recorder.js',
			[],
			SPEECHECK_VERSION,
			true
		);

		// Plugin JS scripts
		wp_enqueue_script(
			'speecheck',
			SPEECHECK_URL . '/assets/js/main.js',
			[ 'speecheck-recorder' ],
			SPEECHECK_VERSION,
			true
		);
	}
}
