<?php
namespace Speecheck;

/*
 * The plugin admin class
 */
class Admin {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		new Admin\Sentence();
		new Admin\Menu();
	}
}
