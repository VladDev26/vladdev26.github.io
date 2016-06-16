//FIXES placeholder in IE8
;(function(){
	$('[placeholder]').focus(function(){
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
	    input.val('');
	    input.removeClass('placeholder_IE8');
	  }
	}).blur(function(){
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')){
	    input.addClass('placeholder_IE8');
	    input.val(input.attr('placeholder'));
	  }
	}).blur();
})();