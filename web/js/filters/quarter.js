var title = new Array("All Quarters", "Quarter 1(upper right)", "Quarter 2(lower right)", "Quarter 3(lower left)", "Quarter 4(upper left)");

$(document).ready(function(){

	// Default dropdown action to show/hide dropdown content
	$('#js-dropp-action-3').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('js-open');
		$(this).parent().next('.dropp-body').toggleClass('js-open');
	});

	// Using as fake input select dropdown
	$('label').click(function() {
		$(this).addClass('js-open').siblings().removeClass('js-open');
		$('.dropp-body, #js-dropp-action-3').removeClass('js-open');
	});
	
	// get the value of checked input radio and display as dropp title
	$('input[name="quarter"]').change(function() {
		var value = $("input[name='quarter']:checked").val();
		showQuarter(value);
		$('#q_dropp_title').text(title[value]);
	});
	
});