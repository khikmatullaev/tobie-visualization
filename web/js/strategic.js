/**Initialization**/
var graph = [];
var cluster = new Array();
var density = new Array();
var centrality = new Array();
var nodeNum = new Array();
var xAxisMax;
var xAxisMin;
var yAxisMax;
var yAxisMin;
var chart = new Highcharts.chart('container', {
	chart: {
		type: 'bubble',
		plotBorderWidth: 1,
	},
	
	credits: {
		enabled: false
	},

	legend: {
		enabled: false,
		/*
		align: 'center',
		verticalAlign: 'bottom',
		layout: 'horizatal',
		x: 0,
		y: 0,
		width: 400,
		backgroundColor: '#FCFFC5',
		borderColor: '#C98657',
		borderWidth: 1
		*/
	},

	title: {
		text: '',
		style: {
			display: 'none'
		}
	},

	xAxis: {
		gridLineWidth: 1,
		title: {
			text: 'Centrality'
		}
	},

	yAxis: {
		startOnTick: false,
		endOnTick: false,
		title: {
			text: 'Density'
		}
	},

	tooltip: {
		useHTML: true,
		headerFormat: '<table>',
		pointFormat: '<tr><th colspan="2"><h3>Cluster {point.name}</h3></th></tr>' +
			'<tr><th>Centrality: </th><td>{point.x}</td></tr>' +
			'<tr><th>Density: </th><td>{point.y}</td></tr>' +
			'<tr><th>Number of Nodes:</th><td>{point.z}</td></tr>',
		footerFormat: '</table>',
		followPointer: true
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
						sessionStorage.setItem('cluster', this.name);
						location.href = "../site/keyword";
					}
				}
			}
		},
		bubble: {
			//minSize:8,
			//maxSize:20,
			events: {
				legendItemClick: function(){
					
				}
			}
		}
	},

	series: 
		[{
			name: "Quarter 4"
		},{
			name: "Quarter 1"
		},{
			name: "Quarter 3"
		},{
			name: "Quarter 2"
		}],
		
});
setData();
drawGraph();

function drawGraph(){
	chart.series[0].setData([]);
	chart.series[1].setData([]);
	chart.series[2].setData([]);
	chart.series[3].setData([]);
	var c_median = median(centrality);
	var d_median = median(density);
	for( var i=0 ; i<graph.length ; i++){
		var cen = parseFloat(graph[i].centrality.toFixed(6));
		var den = parseFloat(graph[i].density.toFixed(6));
		//series[1] is the upper right quarter
		if(cen>=c_median && den>=d_median){
			chart.series[1].addPoint({x:cen, y:den, z:nodeNum[i], name:cluster[i], color:color[cluster[i]]});
		}
		//series[3] is the lower right quarter
		else if(cen>=c_median && den<=d_median){
			chart.series[3].addPoint({x:cen, y:den, z:nodeNum[i], name:cluster[i], color:color[cluster[i]]});
		}
		//series[2] is the lower left quarter
		else if(cen<c_median && den<d_median){
			chart.series[2].addPoint({x:cen, y:den, z:nodeNum[i], name:cluster[i], color:color[cluster[i]]});
		}
		//series[0] is the upper left quarter
		else if(cen<c_median && den>d_median){
			chart.series[0].addPoint({x:cen, y:den, z:nodeNum[i], name:cluster[i], color:color[cluster[i]]});
		}
	}
	chart.xAxis[0].removePlotLine('xPlotLine');
	chart.xAxis[0].addPlotLine({
		color: 'black',
		dashStyle: 'dot',
		width: 2,
		value: c_median,
		label: {
			rotation: 0,
			y: 15,
			style: {
				fontStyle: 'italic'
			},
			text: 'Median Centrality: ' + c_median
		},
		zIndex: 3,
		id: 'xPlotLine'
	});
	chart.yAxis[0].removePlotLine('yPlotLine');
	chart.yAxis[0].addPlotLine({
		color: 'black',
		dashStyle: 'dot',
		width: 2,
		value: d_median,
		label: {
			align: 'right',
			style: {
				fontStyle: 'italic'
			},
			text: 'Median Density: '+ d_median,
			x: -10
		},
		zIndex: 3,
		id: 'yPlotLine'
	});
	chart.xAxis[0].setExtremes(xAxisMin, xAxisMax);
	chart.yAxis[0].setExtremes(yAxisMin, yAxisMax);
}

/**function**/
//calculate median value
function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

//Set axis scale for both x-axis and y-axis based on values
function setAxis(value){
	var interval = (Math.max.apply(null,value) - Math.min.apply(null,value)) / 4;
	var maxValue = Math.max.apply(null,value);
	var minValue = Math.min.apply(null,value);
	if(interval == 0){
		var info = {"max":maxValue*2,"min":0};
	}
	else{
		var max = maxValue / interval;
		var min = minValue / interval;
		if(interval<=1&&interval>0.1){
			interval = Math.ceil(interval*10)/10;
		}
		else if(interval<=0.1&&interval>0.01){
			interval = Math.ceil(interval*100)/100;
		}
		else if(interval<=0.01&&interval>0.001){
			interval = Math.ceil(interval*1000)/1000;
		}
		else if(interval<=0.001&&interval>=0.0001){
			interval = Math.ceil(interval*10000)/10000;
		}
		min = Math.floor(min);
		if((max-min)>=4&&(max-min)<=4.25){
			max = (4.25 + min) * interval;
			min = (-0.75 + min) * interval;
		}
		else if((max-min)>4.25&&(max-min)<=4.5){
			max = (4.5 + min) * interval;
			min = (-0.5 + min) * interval;
		}
		else if((max-min)>4.5&&(max-min)<=4.75){
			max = (4.75 + min) * interval;
			min = (-0.25 + min) * interval;
		}
		else if((max-min)>4.75&&(max-min)<=5){
			max = (5 + min) * interval;
			min = (0 + min) * interval;
		}
		var info = {"max":max,"min":min};
	}
	return info;
}

function showQuarter(index){
	if(index==0){
		chart.series[0].show();
		chart.series[1].show();
		chart.series[2].show();
		chart.series[3].show();
	}
	else if(index==1){
		chart.series[0].hide();
		chart.series[1].show();
		chart.series[2].hide();
		chart.series[3].hide();
	}
	else if(index==2){
		chart.series[0].hide();
		chart.series[1].hide();
		chart.series[2].hide();
		chart.series[3].show();
	}
	else if(index==3){
		chart.series[0].hide();
		chart.series[1].hide();
		chart.series[2].show();
		chart.series[3].hide();
	}
	else if(index==4){
		chart.series[0].show();
		chart.series[1].hide();
		chart.series[2].hide();
		chart.series[3].hide();
	}
}

/**Data**/
//Send request to server to get data with (from_date,to_date,country)
function getData(from_date,to_date,country,co,ps1,ps2){
    var result = new Array();
	
    $.ajax({
        url: 'strategicdb',
        type: "GET",
        data:{from_date:from_date, to_date:to_date, country:country, co:co, ps1:ps1, ps2:ps2},
        dataType: "json",
        async: false,
        error: function(){
            alert('Error loading XML document\n'+'from_date: '+from_date+'\n'+'end_date: '+to_date+'\n'+'country: '+country+'\n'+"co-occurence = "+co+'\n'+"pass1link = "+ps1+'\n'+"pass2link = "+ps2);
        },
        success: function(data){
            result = data;
        }
    });

    return result;
}

function setData(){
	graph = getData(num2ymd(start_date[0],start_date[1]),num2ymd(end_date[0],end_date[1]),country[visibleSeriesIndex][0],co,ps1,ps2);
	cluster = new Array();
	density= new Array();
	centrality = new Array();
	nodeNum = new Array();
	for( var i=0; i<graph.length; i++ ){
		centrality[i] = parseFloat(graph[i].centrality.toFixed(6));
		density[i] = parseFloat(graph[i].density.toFixed(6));
		nodeNum[i] = graph[i].nodeNum;
		cluster[i] = graph[i].name;
	}
	var xAxis = setAxis(centrality);
	xAxisMax = xAxis["max"];
	xAxisMin = xAxis["min"];
	var yAxis = setAxis(density);
	yAxisMax = yAxis["max"];
	yAxisMin = yAxis["min"];
}

function update(){
	drawGraph();
}
