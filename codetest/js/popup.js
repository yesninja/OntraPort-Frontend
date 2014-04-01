var id , popup , offscreen;

jQuery(document).ready(function($) {

	
	$('a[data-reveal-id="popUp"]').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();
		var top = $(window).scrollTop() + 200;
		offScreen = {top: -500 , opacity : 0};
		var onScreen = {top:top , opacity : 1};
		id = $(this).data('revealId');
		var popup = $(this);
		$("#"+id).css(offScreen).stop(true).animate(onScreen).show();
		$("#"+id+" textarea").first().focus();


		showFadeBox(true);
		
		$(".close-reveal-modal ").on('click', function(e) {
			//reverse the animation to hide it but only if it is visible...
		
			closePopUp();

		});
		
		$(window).on('click' , function(e) {
			//reverse the animation to hide it 
		
			if ($("#"+id).is(":visible")) {
				
				if(!$(e.target).is(".popup") && !$(e.target).parents().is(".popup")) {
					showFadeBox(false);
					$("#"+id).animate(offScreen , 400 , function() {
						$(this).hide();
						
					});
				}
			}
		});
		return false;
	});

});

	function closePopUp() {
		if ($("#"+id).is(":visible")) {
			
			showFadeBox(false);
			$("#"+id).animate(offScreen , 400 , function() {
				
				
			});
		}	
	
	}
	
	function showFadeBox(show) {
		if (show) {
			$("#fade-container").fadeIn();
		} else {
			$("#fade-container").fadeOut();
		}
	}