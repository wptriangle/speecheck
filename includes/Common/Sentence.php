<?php
namespace Speecheck\Common;

/**
 * The sentence post type class
 */
class Sentence {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'init', [ $this, 'register_sentence' ] );
	}

	/**
	 * Register the post type
	 *
	 * @return void
	 */
	public function register_sentence() {
		register_post_type(
			'speecheck-sentence',
			[
				'labels' => [
					'name' => __( 'Sentences', 'speecheck' ),
					'menu_name' => __( 'Speecheck', 'speecheck' ),
					'singular_name' => __( 'Sentence', 'speecheck' ),
				],
				'public' => true,
				'has_archive' => true,
				'show_ui' => true,
				'show_in_admin_bar' => false,
				'menu_icon' => 'dashicons-microphone',
				'hierarchical' => false,
				'show_in_rest' => false,
				'supports' => [ 'title' , 'editor' ],
				'publicly_queryable' => true,
			]
		);
	}
}
