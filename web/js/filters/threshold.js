var threshold = {
	 1:new Array(1,2,2),
	 2:new Array(2,3,3),
	 3:new Array(5,5,8),
	 4:new Array(8,5,8),
	 5:new Array(15,8,12),
};
var thIndex;
var co;
var ps1;
var ps2;

if(!storage.getItem("thresholdIndex")){
	thIndex = 1;
	setLocalThreshold(thIndex);
}
else{
	thIndex = parseInt(storage.getItem("thresholdIndex"));
}
co = threshold[thIndex][0];
ps1 = threshold[thIndex][1];
ps2 = threshold[thIndex][2];

function setLocalThreshold(index){
	storage.setItem("thresholdIndex",index);
}


//Threshold selection
$(document).ready(function(){
	
	// Default country to drop header title
	$("#t_dropp_title").text("Option "+thIndex);
	
	// Default dropdown action to show/hide dropdown content
	$('#js-dropp-action-2').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('js-open');
		$(this).parent().next('.dropp-body').toggleClass('js-open');
	});

	// Using as fake input select dropdown
	$('label').click(function() {
		$(this).addClass('js-open').parent().siblings().children().removeClass('js-open');
		$('.dropp-body, #js-dropp-action-2').removeClass('js-open');
	});

	// get the value of checked input radio and display as thres title
	$("input[name='threshold']").change(function() {
		var value = $("input[name='threshold']:checked").val();
		thIndex = value;
		setLocalThreshold(value);
		co = threshold[thIndex][0];
		ps1 = threshold[thIndex][1];
		ps2 = threshold[thIndex][2];
		setData();
		update();
		$("#t_dropp_title").text("Option "+thIndex);
	});
});