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
		// Do not load if not sentence post type
		if( ! is_singular( 'speecheck-sentence' ) ) {
			return;
		}

		global $post;
		$asset_file = include( SPEECHECK_PATH . '/build/front.asset.php');

		// Plugin front styles
		wp_enqueue_style(
			'speecheck-front-styles',
			SPEECHECK_URL . '/build/front.css',
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

		// Google Rest API
		wp_enqueue_script(
			'speecheck-gapi',
			'https://apis.google.com/js/api.js',
			[],
			SPEECHECK_VERSION,
			true,
		);

		// Recorder.js
		wp_enqueue_script(
			'speecheck-recorder',
			'https://cdn.jsdelivr.net/gh/mattdiamond/Recorderjs@08e7abd99739be6946f19f6806ccb368138f2dd3/dist/recorder.js',
			[],
			SPEECHECK_VERSION,
			true
		);

		// String similarity
		wp_enqueue_script(
			'speecheck-string-similarity',
			'https://unpkg.com/string-similarity/umd/string-similarity.min.js',
			[],
			SPEECHECK_VERSION,
			true,
		);

		// Plugin front scripts
		wp_enqueue_script(
			'speecheck-front-scripts',
			SPEECHECK_URL . '/build/front.js',
			[
				'speecheck-gapi',
				'speecheck-recorder',
				'speecheck-string-similarity',
				...$asset_file[ 'dependencies' ]
			],
			$asset_file[ 'version' ],
			true
		);

		// Pass post content to JS
		wp_localize_script( 'speecheck-front-scripts', 'speecheckVars', [
			'postContent' => $post->post_content,
			'sentenceAudio' => get_post_meta(  $post->ID, 'speecheck_sentence_audio', true ),
			'sentenceRaw' => get_post_meta(  $post->ID, 'speecheck_sentence_comparison', true ),
		] );
	}
}
