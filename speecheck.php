<?php
/**
 * Plugin Name: Speecheck
 * Description: A speaking proficiency assessment plugin for WordPress
 * Plugin URI: https://nahid.dev/project/speecheck
 * Author: Nahid Ferdous Mohit
 * Version: 1.0.0
 * Author URI: https://nahid.dev
 * Text Domain: speecheck
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// If this file is called directly, abort
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Use composer autoload
require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main plugin class
 */
final class Speecheck {

	/**
	 * Plugin version
	 *
	 * @var string
	 */
	const version = '1.0.0';

	/**
	 * Class constructor
	 *
	 * @return void
	 */
	private function __construct() {
		// Define plugin instants
		$this->define_constants();

		// Execute on plugin activation
		register_activation_hook( __FILE__, [ $this, 'activate' ] );

		// Execute after plugins have loaded
		add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
	}

	/**
	 * Initializes a singleton instance
	 *
	 * @return \Speecheck
	 */
	public static function init() {
		static $instance = false;

		if ( ! $instance ) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	 * Define required plugin constants
	 *
	 * @return void
	 */
	public function define_constants() {
		define( 'SPEECHECK_VERSION', self::version );
		define( 'SPEECHECK_FILE', __FILE__ );
		define( 'SPEECHECK_PATH', __DIR__ );
		define( 'SPEECHECK_PATH', __DIR__ );
		define( 'SPEECHECK_URL', plugins_url( '', SPEECHECK_FILE ) );
		define( 'SPEECHECK_ASSETS', SPEECHECK_URL . '/assets' );
	}

	/**
	 * Execute on plugin activation
	 *
	 * @return void
	 */
	public function activate() {
		// check if plugin install time is present
		$installed = get_option( 'speecheck_installed' );

		// if not, store installation time
		if ( ! $installed ) {
			update_option( 'speecheck_installed', time() );
		}

		// store plugin version
		update_option( 'speecheck_version', SPEECHECK_VERSION );
	}

	/**
	 * Initialize the plugin
	 *
	 * @return void
	 */
	public function init_plugin() {
		if ( is_admin() ) {
			new Speecheck\Admin();
		} else {
			new Speecheck\Frontend();
		}
	}
}

/**
 * Initializes the main plugin
 *
 * @return \Speecheck
 */
function speecheck() {
	return Speecheck::init();
}

// Start the plugin
speecheck();
