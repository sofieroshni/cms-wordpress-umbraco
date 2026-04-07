<?php
/**
 * Plugin Name: custom-plugin-roshni
 * Description: Mit forste plugin
 * Version: 1.0
 * Author: Sofie Roshni de Nijs Vedel
 */

function sig_hej(){
    echo "Hej, jeg er det forste plugin";
}
add_action('init, sig_hej');

//denne hook gør at der kommer en note i bunden af indlægget hvis det er et indlæg (is_single),altså der ikke er flere end 1
function custom_plugin_footer_note($content) {
    if (is_single()) {
        $content .= '<p style="background:#f0f0f0; padding:10px;">Dette er mit første plugin, den kan deværre kun vises hvis jeg 
        har 1 post tilbage så jeg har lige spildt min tid :) -(desto mindrer jeg self, sletter alle på nær 1 post) </p>';
    }
    return $content;
}
add_filter('the_content', 'custom_plugin_footer_note');


// Dette hook er bare for at vise 


//https://developer.wordpress.org/plugins/hooks/filters/ 