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
		add_submenu_page(
			'edit.php?post_type=speecheck-sentence',
			__( 'Settings', 'speecheck' ),
			__( 'Settings', 'speecheck' ),
			'manage_options',
			'speecheck-settings',
			[ $this, 'speecheck_settings_page' ],
		);
	}

	/**
	 * Specify content to display in the Speecheck page
	 *
	 * @return void
	 */
	public function speecheck_settings_page() {
		echo 'Hello World!';
	}
}
