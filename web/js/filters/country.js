var visibleSeriesIndex;

if(!storage.getItem("countryIndex")){
	visibleSeriesIndex = 27;
	setLocalCountry(visibleSeriesIndex);
}
else{
	visibleSeriesIndex = parseInt(storage.getItem("countryIndex"));
}

function setLocalCountry(index){
	storage.setItem("countryIndex",index);
}

$(document).ready(function(){
	// Default countries to dropdown columns
	for(var i=0; i<28; i++){
		$("#country").append("<label for='"+country[i][0]+"'>"+country[i][1]+"<input type='radio' id='"+country[i][0]+"' name='country' value='"+i+"'/></label>");
	}
	
	// Default country to drop header title
	$("#c_dropp_title").append(country[visibleSeriesIndex][1]);

	// Default dropdown action to show/hide dropdown content
	$('#js-dropp-action-1').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('js-open');
		$(this).parent().next('.dropp-body').toggleClass('js-open');
	});

	// Using as fake input select dropdown
	$('label').click(function() {
		$(this).addClass('js-open').siblings().removeClass('js-open');
		$('.dropp-body, #js-dropp-action-1').removeClass('js-open');
	});
	
	// get the value of checked input radio and display as dropp title
	$('input[name="country"]').change(function() {
		var value = $("input[name='country']:checked").val();
		visibleSeriesIndex = value;
		if(start_date[0]==end_date[0]&&start_date[1]==end_date[1]){
			$("#subtitle").text(formatDT(start_date[0],start_date[1])+", "+country[visibleSeriesIndex][1]);
		}
		else{
			$("#subtitle").text(formatDT(start_date[0],start_date[1])+" - "+formatDT(end_date[0],end_date[1])+", "+country[visibleSeriesIndex][1]);
		}
		setLocalCountry(value);
		setData();
		update();
		$('#c_dropp_title').text(country[value][1]);
	});
});