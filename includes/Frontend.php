<?php
namespace Speecheck;

/**
 * The plugin front-end class
 */
class Frontend {
	/**
	 * The class constructor
	 */
	function __construct() {
		new Frontend\Shortcode();
		new Frontend\Templates();
	}
}
