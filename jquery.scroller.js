(function($) {
    var elements = [];
    var t = [];

    $.fn.scroller = function(options) {
	var container = $(this).addClass('ui-scroller');

	var settings = $.extend({
	    delay: 2000,
	    speed: 'slow'
	}, options);

	container.each(function(i) {
	    this.settings = settings;
	    this.pause = false;

	    $(this).hover(function() { pause(true, i); }, function() { pause(false, i); });

	    $('> ul', this).bind('mouseover', function(evt) {
		if($(evt.target).is('li')) {
		    $(evt.target).addClass('hover');
		}
	    }).bind('mouseout', function(evt) {
		if($(evt.target).is('li')) {
		    $(evt.target).removeClass('hover');
		}
	    });

	    elements.push(this);
	    t.push(setTimeout(function() { scroll(i) }, settings.delay));
	});

	return container;
    };

    function pause(status, index) {
	var elm = elements[index];
	elm.pause = status;
	if(elm.pause) {
	    clearTimeout(t[index]);
	    var ul = $('> ul', elm)[0];
	    $(ul).stop().animate({ top: '0px' }, 250);
	} else {
	    t[index] = setTimeout(function() { scroll(index) }, elm.settings.delay / 2);
	}
    }

    function scroll(index) {
	var elm = elements[index];
	var ul = $('> ul', elm)[0];
	var first_item = $('> li:first-child', ul);
	var shift = first_item.height();
	$(ul).animate({ top: '-' + shift + 'px' }, elm.settings.speed, function() {
	    t[index] = setTimeout(function() { scroll(index) }, elm.settings.delay);
	    first_item.remove();		    
	    $(ul).css('top', '0px').find('> li:last-child').after(first_item.clone());
	});
    }
})(jQuery);
 


			