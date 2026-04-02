<?php
function wptheme_script_enqueue() {
 wp_enqueue_style(
 'customstyle',
 get_template_directory_uri() . '/css/app.css',
 array(),
 '1.0',
 'all'
 );
 wp_enqueue_script(
 'customjs',
 get_template_directory_uri() . '/js/app.js',
 array(),
 '1.0',
 true
 );
}
add_action('wp_enqueue_scripts', 'wptheme_script_enqueue');
?>
