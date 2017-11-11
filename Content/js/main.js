$(document).ready(function() {
	
	// main menu
	jQuery('#menu-toggle').click(function(e) {
        e.preventDefault();
        jQuery('#wrapper').toggleClass('toggled');
    });

    // affix header
    var toggleAffix = function(affixElement, scrollElement, wrapper) {
        var height = affixElement.outerHeight(),
            top = wrapper.offset().top;
          
        if (scrollElement.scrollTop() >= top){
            wrapper.height(height);
            affixElement.addClass("affix");
        } else {
            affixElement.removeClass("affix");
            wrapper.height('auto');
        }  
    };
        
    jQuery('[data-toggle="affix"]').each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');
          
        ele.before(wrapper);
        jQuery(window).on('scroll resize', function() {
            toggleAffix(ele, $(this), wrapper);
        });
          
        // init
        toggleAffix(ele, $(window), wrapper);
    });
	
});
