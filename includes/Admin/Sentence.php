<?php
namespace Speecheck\Admin;

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
					'add_new' => __( 'Add New Sentence', 'speecheck' ),
					'add_new_item' => __( 'Add New Sentence', 'speecheck' ),
					'edit_item' => __( 'Edit Sentence', 'speecheck' ),
					'new_item' => __( 'New Sentence', 'speecheck' ),
					'view_item' => __( 'View Sentence', 'speecheck' ),
					'search_items' => __( 'Search Sentence', 'speecheck' ),
					'not_found' => __( 'No sentence found', 'speecheck' ),
					'not_found_in_trash' => __( 'No sentence found in trash', 'speecheck' ),
					'parent_item_colon' => __( 'Parent sentence:', 'speecheck' ),
					'all_items' => __( 'Sentences', 'speecheck' ),
					'attributes' => __( 'Sentence Options', 'speecheck' ),
				],
				'public' => true,
				'has_archive' => true,
				'show_ui' => true,
				'show_in_admin_bar' => false,
				'menu_icon' => 'dashicons-microphone',
				'hierarchical' => true,
				'show_in_rest' => false,
				'supports' => array( 'title' , 'page-attributes', ),
				'publicly_queryable' => true,
			]
		);
	}
}
