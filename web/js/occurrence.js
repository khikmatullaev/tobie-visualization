var defaultCountry = "Uk";
var visibleSeriesIndex = 27;
//------------send request to server to get data with (from_date,to_date,country)------------
function getData(from_date,to_date,country){
	//console.log(from_date+";"+to_date+";"+country);
    var result = new Array();

    $.ajax({
        url: 'occurrencedb',
        type: "GET",
        data:{from_date:from_date, to_date:to_date, country:country},
        dataType: "json",
        async: false,
        error: function(){
            alert('Error loading XML document\n'+'from_date: '+from_date+'\n'+'end_date: '+to_date+'\n'+'country: '+country);
        },
        success: function(data){
            result = data;
        }
    });

    return result;
}

$(function () {
	var chart = new Highcharts.chart('container', {
		chart: {
			type: 'column',
		},
		title: {
			text: 'Occurence of Skills'
		},
		subtitle: {
			text: num2month[start_date[0]]+", "+start_date[1]+", "+country[visibleSeriesIndex][1]
		},
		credits: {
			enabled: false
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Total occurrences'
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: 'bold',
					color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				}
			}
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			layout: 'horizontal',
			floating: true,
			x: 0,
			y: 61,
			width: 500,
			itemWidth: 70,
			borderColor: '#C98657',
			borderWidth: 1
		},
		tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					format: '{point.name}'
				},
				cursor: 'pointer',
				point: {
					events: {
						click: function () {
							//alert("jump to keywork structure of cluster "+this.options.name+": "+document.URL);
							location.href = "./strategic";
						}
					}
				}
			},
			column: {
				stacking: 'normal',
				animation: false,
				dataLabels: {
					enabled: true,
					color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				},
				events: {
					legendItemClick: function(){
						if (this.visible)
							return false;
						for (var i = 0; i < this.chart.series.length; i++){
							if(this.chart.series[i].visible){
								this.chart.series[i].hide();
							}
						}
						visibleSeriesIndex = this.index;
						setSeries(visibleSeriesIndex);
						setSubtitle(visibleSeriesIndex);
					}
				}
			}
		},
		series: [{
			name: 'AT',			//Austria
		},{
			name: 'BE',			//Belgium
		},{
			name: 'BG',			//Bulgaria
		},{
			name: 'CY',			//Cyprus
		},{
			name: 'CZ',			//Czech Republic
		},{
			name: 'DE',			//Germany
		},{
			name: 'DK',			//Denmark
		},{
			name: 'EE',			//Estonia
		},{
			name: 'ES',			//Spain
		},{
			name: 'FI',			//Finland
		},{
			name: 'FR',			//France
		},{
			name: 'GR',			//Greece
		},{
			name: 'HR',			//Croatia
		},{
			name: 'HU',			//Hungary
		},{
			name: 'IE',			//Ireland
		},{
			name: 'IT',			//Italy
		},{
			name: 'LT',			//Lithuania
		},{
			name: 'LU',			//Luxembourg
		},{
			name: 'LV',			//Latvia
		},{
			name: 'MT',			//Malta
		},{
			name: 'NL',			//Netherlands
		},{
			name: 'PL',			//Poland
		},{
			name: 'PT',			//Portugal
		},{
			name: 'RO',			//Romania
		},{
			name: 'SE',			//Sweden
		},{
			name: 'SK',			//Slovakia
		},{
			name: 'SL',			//Slovenia
		},{
			name: 'Uk',			//United Kingdom
		}]
	});
	//-------------------------Default legend setting-----------------
	for( var i=0; i<=27; i++){
		var name = chart.series[i].name;
		if(name==defaultCountry){
			chart.series[i].show();
			setSeries(i);
		}
		else{
			chart.series[i].hide();
		}
	}
	//-------------------------Set data for series---------------------
	function setSeries(index){
		var country = chart.series[index].name;
		
		var data = getData(num2ymd(start_date[0],start_date[1]),num2ymd(end_date[0],end_date[1]),country);
		var count = new Array();
		var skill = new Array();

		for( var i = 0; i < data.length; i++ )
		{
			skill[i] = data[i]['name'];
			count[i] = data[i]['occurrence'];
		}
		chart.xAxis[0].setCategories(skill);
		chart.series[index].setData(count);
	}
	//------------------------set the subtitle of chart----------------------------------------
	function setSubtitle(index){
		if(start_date[0]==end_date[0]&&start_date[1]==end_date[1]){
			chart.subtitle.update({ text: num2month[start_date[0]]+", "+start_date[1]+", "+country[index][1] });
		}
		else{
			chart.subtitle.update({ text: num2month[start_date[0]]+", "+start_date[1]+" - "+num2month[end_date[0]]+", "+end_date[1]+", "+country[index][1] });
		}
	}
	//------------------------Reset data for series when timeslider change---------------------
	$("#slider-range").bind("valuesChanged", function(e, data){
		start_date = num2date(data.values.min/2);
		end_date = num2date((data.values.max-2)/2);
		changeTimeRange(start_date,end_date);
		$("#but1,#but2,#but3,#but4").css("background-color", "buttonface");
		//console.log(start_date+";"+end_date+";"+visibleSeriesIndex);
		setSeries(visibleSeriesIndex);
		setSubtitle(visibleSeriesIndex);
	});
});
