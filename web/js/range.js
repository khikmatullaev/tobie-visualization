
//-------------default chart setting-----------------------------------
var current_month = 1;
var current_year = 2016;
var min_date = new Array(1,2016); 	//the earliest date
var max_date = new Array(12,2017);	//the latest date
var start_date = [current_month,current_year];
var end_date = [current_month,current_year];
//---------------------------------------------------------------------

var num2month = {
    1: new Array("Jan"),
    2: new Array("Feb"),
    3: new Array("Mar"),
    4: new Array("Apr"),
    5: new Array("May"),
    6: new Array("Jun"),
    7: new Array("Jul"),
    8: new Array("Aug"),
    9: new Array("Sept"),
    10: new Array("Oct"),
    11: new Array("Nov"),
    12: new Array("Dec"),
};

var color = {
    1: "#0000ff",		//blue
    2: "#FF6600",		//orange
    3: "#9900FF",		//purple
    4: "#006600",		//green

    5: "#0066ff",		//blue
    6: "#CC6600",		//orange
    7: "#9966FF",		//purple
    8: "#00CC00",		//green

    9: "#00CCff",		//blue
    10: "#996600",		//orange
    11: "#CC00FF",		//purple
    12: "#000033",		//green

    13: "#00ffff",		//blue
    14: "#996666",		//orange
    15: "#CC66FF",		//purple
    16: "#009966",		//green
};

var country = {
    0:new Array('AT','Austria'),
    1:new Array('BE','Belgium'),
    2:new Array('BG','Bulgaria'),
    3:new Array('CY','Cyprus'),
    4:new Array('CZ','Czech Republic'),
    5:new Array('DE','Germany'),
    6:new Array('DK','Denmark'),
    7:new Array('EE','Estonia'),
    8:new Array('ES','Spain'),
    9:new Array('FI','Finland'),
    10:new Array('FR','France'),
    11:new Array('GR','Greece'),
    12:new Array('HR','Croatia'),
    13:new Array('HU','Hungary'),
    14:new Array('IE','Ireland'),
    15:new Array('IT','Italy'),
    16:new Array('LT','Lithuania'),
    17:new Array('LU','Luxembourg'),
    18:new Array('LV','Latvia'),
    19:new Array('MT','Malta'),
    20:new Array('NL','Netherlands'),
    21:new Array('PL','Poland'),
    22:new Array('PT','Portugal'),
    23:new Array('RO','Romania'),
    24:new Array('SE','Sweden'),
    25:new Array('SK','Slovakia'),
    26:new Array('SL','Slovenia'),
    27:new Array('Uk','United Kingdom')
};

var month_from = formatDT(current_month,current_year);
var month_to = formatDT(current_month,current_year);

function date2num(month,year){
    var zero = min_date[0] + 12 * min_date[1];
    return month + 12 * year - zero;
}

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

function getFullDate(start_date,end_date){
    var dn_1 = date2num(start_date[0],start_date[1]);
    var dn_2 = date2num(end_date[0],end_date[1]);
    var full_date = new Array();
    for(var i=dn_1 ; i<=dn_2; i++){
        full_date[i-dn_1] = num2date(i);
    }
    return full_date;
}

function formatDT(m,y){
    var year = y;
    var month = num2month[m];
    return month + ',' + year;
}

function changeTimeRange(start_date,end_date){
    month_from = formatDT(start_date[0],start_date[1]);
    month_to = formatDT(end_date[0],end_date[1]);
    if(start_date[0]==end_date[0]&&start_date[1]==end_date[1]){
        $("#slider-time-begin").html(month_from);
        $("#slider-time-end").html("");
    }
    else{
        $("#slider-time-begin").html(month_from);
        $("#slider-time-end").html(" - "+month_to);
    }
    graphVisualization();
}

function setDate(range){
    if((date2num(end_date[0],end_date[1])+1)*2-range<=0){
        start_date = min_date;
        end_date = num2date(date2num(min_date[0],min_date[1])+(range/2-1));
    }
    else{
        end_date = end_date;
        start_date = num2date(date2num(end_date[0],end_date[1])-(range/2-1));
    }
    $("#slider-time-range").rangeSlider("values", date2num(start_date[0],start_date[1])*2, (date2num(end_date[0],end_date[1])+1)*2);
    changeTimeRange(start_date,end_date);
    //console.log(start_date,end_date);
}


$(document).ready(function(){
    graphVisualization();
    $("#slider-time-begin").html(month_from);
    $("#slider-time-end").html("");
    $("#button1").css("background-color", "#2E9AFE");

    $("#slider-time-range").rangeSlider({
        bounds: {min: date2num(min_date[0],min_date[1]), max: (date2num(max_date[0],max_date[1])+1)*2},
        defaultValues:{min: date2num(current_month,current_year)*2, max: (date2num(current_month,current_year)+1)*2},
        valueLabels:"hide",
        step: 2,
    });

    $("#slider-time-range").bind("valuesChanged", function(e, data){
        start_date = num2date(data.values.min/2);
        end_date = num2date((data.values.max-2)/2);
        changeTimeRange(start_date,end_date);
        $("#button1,#button3,#button6,#button12").css("background-color", "buttonface");
    });

    $("#button1").on('click', function () {
        var targetEl = $(this).data('target');
        $.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
            $('.' + targetEl).fadeIn();
            $("#button1").css("background-color", "#2E9AFE");
            $("#button3,#button6,#button12").css("background-color", "buttonface");
        });
        range = 2;
        setDate(range);
    });

    $("#button3").on('click', function () {
        var targetEl = $(this).data('target');
        $.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
            $('.' + targetEl).fadeIn();
            $("#button3").css("background-color", "#2E9AFE");
            $("#button1,#button6,#button12").css("background-color", "buttonface");
        });
        range = 6;
        setDate(range);
    });

    $("#button6").on('click', function () {
        var targetEl = $(this).data('target');
        $.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
            $('.' + targetEl).fadeIn();
            $("#button6").css("background-color", "#2E9AFE");
            $("#button1,#button3,#button12").css("background-color", "buttonface");
        });
        range = 12;
        setDate(range);
    });

    $("#button12").on('click', function () {
        var targetEl = $(this).data('target');
        $.when($('.' + targetEl).siblings('a').fadeOut()).done(function () {
            $('.' + targetEl).fadeIn();
            $("#button12").css("background-color", "#2E9AFE");
            $("#button1,#button3,#button6").css("background-color", "buttonface");
        });
        range = 24;
        setDate(range);
    });
});

