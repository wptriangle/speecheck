<?php
namespace Speecheck\Admin;

/**
 * The plugin admin menu class
 */
class Menu {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
	}

	/**
	 * Add admin menu pages
	 *
	 * @return void
	 */
	public function admin_menu() {
		add_menu_page(
			__( 'Speecheck', 'speecheck' ),
			__( 'Speecheck', 'speecheck' ),
			'manage_options',
			'speecheck',
			[ $this, 'speecheck_page' ],
			'dashicons-microphone'
		);
	}

	/**
	 * Specify content to display in the Speecheck page
	 *
	 * @return void
	 */
	public function speecheck_page() {
		echo 'Hello World!';
	}
}
