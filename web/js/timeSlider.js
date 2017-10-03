var storage = window.localStorage;
var start_month;
var start_year;
var end_month;
var end_year;
//Initialize LocalStorage
if(!storage.getItem("startMonth")||!storage.getItem("startYear")){
	start_month = 8;
	start_year = 2016;
	setLocalStartDate(start_month,start_year);
}
else{
	start_month = parseInt(storage.getItem("startMonth"));
	start_year = parseInt(storage.getItem("startYear"));
}
if(!storage.getItem("endMonth")||!storage.getItem("endYear")){
	end_month = 8;
	end_year = 2016;
	setLocalEndDate(end_month,end_year);
}
else{
	end_month = parseInt(storage.getItem("endMonth"));
	end_year = parseInt(storage.getItem("endYear"));
}
//Initialize range of time slider
var min_date = new Array(1,2016); 	//the earliest date of time slider
var max_date = new Array(12,2017);	//the latest date of time slider
var start_date = [start_month,start_year];
var end_date = [end_month,end_year];
$(document).ready(function(){
	if(start_date[0]==end_date[0]&&start_date[1]==end_date[1]){
		$(".slider-time").html(formatDT(start_date[0],start_date[1]));
		$(".slider-time2").html("");
		$("#subtitle").text(formatDT(start_date[0],start_date[1])+", "+country[visibleSeriesIndex][1]);
	}
	else{
		$(".slider-time").html(formatDT(start_date[0],start_date[1]));
		$(".slider-time2").html(" - "+formatDT(end_date[0],end_date[1]));
		$("#subtitle").text(formatDT(start_date[0],start_date[1])+" - "+formatDT(end_date[0],end_date[1])+", "+country[visibleSeriesIndex][1]);
	}
});

/**function**/
//Set LocalStorage
function setLocalStartDate(start_month,start_year){
	storage.setItem("startMonth",start_month);
	storage.setItem("startYear",start_year);
}
function setLocalEndDate(end_month,end_year){
	storage.setItem("endMonth",end_month);
	storage.setItem("endYear",end_year);
}
//Transfer [month,year] to number(min date of timeslider is 0)
function date2num(month,year){
	var zero = min_date[0] + 12 * min_date[1];
	return month + 12 * year - zero;
}
//Inverse transfer number to [month,year](0 means min date of timeslider)
function num2date(value){
	var month = min_date[0] + ((value - 0) % 12);
	if(month > 12){
		month = month -12;
		var year = min_date[1] + parseInt((value - 0) / 12) + 1;
	}
	else{
		var year = min_date[1] + parseInt((value - 0) / 12);
	}
	return [month,year]
}
//Transfer [8,2016] to [Aug,2016]
function formatDT(m,y){
	var year = y;
	var month = num2month[m];
	return month + ', ' + year;
}
//Transfer [8,2016] to "2016-08-01"
function num2ymd(m,y){
	var year = y;
	var month = m;
	if(m<10){
		return y+"-0"+m+"-01";
	}
	else{
		return y+"-"+m+"-01";
	}
}
//Rewrite the time silder range according to inputs
function changeTimeRange(start_date,end_date){
	if(start_date[0]==end_date[0]&&start_date[1]==end_date[1]){
		$(".slider-time").html(formatDT(start_date[0],start_date[1]));
		$(".slider-time2").html("");
		$("#subtitle").text(formatDT(start_date[0],start_date[1])+", "+country[visibleSeriesIndex][1]);
	}
	else{
		$(".slider-time").html(formatDT(start_date[0],start_date[1]));
		$(".slider-time2").html(" - "+formatDT(end_date[0],end_date[1]));
		$("#subtitle").text(formatDT(start_date[0],start_date[1])+" - "+formatDT(end_date[0],end_date[1])+", "+country[visibleSeriesIndex][1]);
	}
} 
//Rewrite time slider range when click buttons
function setDate(range){
	if((date2num(end_date[0],end_date[1])+1)*2-range<=0){
		start_date = min_date;
		end_date = num2date(date2num(min_date[0],min_date[1])+(range/2-1));
	}
	else{
		end_date = end_date;
		start_date = num2date(date2num(end_date[0],end_date[1])-(range/2-1));
	}
	$("#slider-range").rangeSlider("values", date2num(start_date[0],start_date[1])*2, (date2num(end_date[0],end_date[1])+1)*2);
	changeTimeRange(start_date,end_date);
}

/**Filter**/
$(document).ready(function(){
	
	$("#slider-range").rangeSlider({
		bounds: {min: date2num(min_date[0],min_date[1]), max: (date2num(max_date[0],max_date[1])+1)*2},
		defaultValues:{min: date2num(start_month,start_year)*2, max: (date2num(end_month,end_year)+1)*2},
		valueLabels:"hide",
		step: 2,
	});
	
	$("#slider-range").bind("valuesChanged", function(e, data){
		start_date = num2date(data.values.min/2);
		end_date = num2date((data.values.max-2)/2);
		changeTimeRange(start_date,end_date);
		setLocalStartDate(start_date[0],start_date[1]);
		setLocalEndDate(end_date[0],end_date[1]);
		setData();
		update();
	});
	
	$("#but1").on('click', function () {
		var targetEl = $(this).data('target');
		$.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
			$('.' + targetEl).fadeIn();
			$("#but2,#but3,#but4").css("background-color", "buttonface");
			$("#but1").css("background-color", "#2E9AFE");
		});
		range = 2;
		setDate(range);
	});
	
	$("#but2").on('click', function () {
		var targetEl = $(this).data('target');
		$.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
			$('.' + targetEl).fadeIn();
			$("#but1,#but3,#but4").css("background-color", "buttonface");
			$("#but2").css("background-color", "#2E9AFE");
		});
		range = 6;
		setDate(range);
	});
	
	$("#but3").on('click', function () {
		var targetEl = $(this).data('target');
		$.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
			$('.' + targetEl).fadeIn();
			$("#but1,#but2,#but4").css("background-color", "buttonface");
			$("#but3").css("background-color", "#2E9AFE");
		});
		range = 12;
		setDate(range);
	});	
	
	$("#but4").on('click', function () {
		var targetEl = $(this).data('target');
		$.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
			$('.' + targetEl).fadeIn();
			$("#but1,#but2,#but3").css("background-color", "buttonface");
			$("#but4").css("background-color", "#2E9AFE");
		});
		range = 24;
		setDate(range);
	});
	
});