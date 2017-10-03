/**Initialization**/
var graph = [];
var chart = new Highcharts.chart('container', {
	chart: {
		type: 'column',
	},
	title: {
		text: '',
		style: {
			display: 'none'
		}
	},
	subtitle: {
		text: '',
		style: {
			display: 'none'
		}
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
		enabled: false,
		/*
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
		*/
	},
	tooltip: {
		headerFormat: '<b>{point.x}</b><br/>',
		pointFormat: 'Total: {point.stackTotal}'
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
			}
			/*
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
					setLocalCountry(visibleSeriesIndex);
					setData();
					update();
					console.log(graph);
				}
			}
			*/
		}
	},
	series: [{
		//name: 'AT',			//Austria
		visible: false
	},{
		name: 'BE',			//Belgium
		visible: false
	},{
		name: 'BG',			//Bulgaria
		visible: false
	},{
		name: 'CY',			//Cyprus
		visible: false
	},{
		name: 'CZ',			//Czech Republic
		visible: false
	},{
		name: 'DE',			//Germany
		visible: false
	},{
		name: 'DK',			//Denmark
		visible: false
	},{
		name: 'EE',			//Estonia
		visible: false
	},{
		name: 'ES',			//Spain
		visible: false
	},{
		name: 'FI',			//Finland
		visible: false
	},{
		name: 'FR',			//France
		visible: false
	},{
		name: 'GR',			//Greece
		visible: false
	},{
		name: 'HR',			//Croatia
		visible: false
	},{
		name: 'HU',			//Hungary
		visible: false
	},{
		name: 'IE',			//Ireland
		visible: false
	},{
		name: 'IT',			//Italy
		visible: false
	},{
		name: 'LT',			//Lithuania
		visible: false
	},{
		name: 'LU',			//Luxembourg
		visible: false
	},{
		name: 'LV',			//Latvia
		visible: false
	},{
		name: 'MT',			//Malta
		visible: false
	},{
		name: 'NL',			//Netherlands
		visible: false
	},{
		name: 'PL',			//Poland
		visible: false
	},{
		name: 'PT',			//Portugal
		visible: false
	},{
		name: 'RO',			//Romania
		visible: false
	},{
		name: 'SE',			//Sweden
		visible: false
	},{
		name: 'SK',			//Slovakia
		visible: false
	},{
		name: 'SL',			//Slovenia
		visible: false
	},{
		name: 'Uk',			//United Kingdom
		visible: false
	}]
});
setData();
drawGraph();

function drawGraph(){
	
	var count = new Array();
	var skill = new Array();
	for( var i = 0; i < graph.length; i++ )
	{
		skill[i] = graph[i]['name'];
		count[i] = graph[i]['occurrence'];
	}
	chart.xAxis[0].setCategories(skill);
	chart.series[0].setData(count);
	chart.series[0].show();
}

/**function**/

/**data**/
//Send request to server to get data with (from_date,to_date,country)
function getData(from_date,to_date,country){
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

function setData(){
	graph = getData(num2ymd(start_date[0],start_date[1]),num2ymd(end_date[0],end_date[1]),country[visibleSeriesIndex][0]);
}

function update(){
	drawGraph();
}
//-------------------------Default legend setting-----------------

/**Filters**/