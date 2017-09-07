var mydata;
var cluster = new Array();
var density = new Array();
var centrality = new Array();
var nodeNum = new Array();
var xAxisMax;
var xAxisMin;
var yAxisMax;
var yAxisMin;
//console.log(start_date+";"+end_date+";"+country[visibleSeriesIndex][0]);
//------------send request to server to get data with (from_date,to_date,country)------------
function getData(from_date,to_date,country){
	//console.log(from_date+";"+to_date+";"+country);
    var result = new Array();

    $.ajax({
        url: 'strategicdb',
        type: "GET",
        data:{from_date:from_date, to_date:to_date, country:country, co:co, ps1:ps1, ps2:ps2},
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
	mydata = getData(num2ymd(start_date[0],start_date[1]),num2ymd(end_date[0],end_date[1]),country[visibleSeriesIndex][0]);
	//console.log(mydata);
	cluster = new Array();
	density= new Array();
	centrality = new Array();
	nodeNum = new Array();
	for( var i=0; i<mydata.length; i++ ){
		centrality[i] = parseFloat(mydata[i].centrality.toFixed(6));
		density[i] = parseFloat(mydata[i].density.toFixed(6));
		nodeNum[i] = mydata[i].nodeNum;
		cluster[i] = mydata[i].name;
	}
	var xAxis = setAxis(centrality);
	xAxisMax = xAxis["max"];
	xAxisMin = xAxis["min"];
	var yAxis = setAxis(density);
	yAxisMax = yAxis["max"];
	yAxisMin = yAxis["min"];
}
/*
var cluster = new Array(1,2,3,4,5,6,7,8,9,10);
var density = new Array(0.00034,0.00058,0.00047,0.00020,0.00110,0.00045,0.00072,0.00020,0.00028,0.00039);
var centrality = new Array(0.00698,0.00169,0.00715,0.00318,0.00227,0.00725,0.00325,0.00450,0.00075,0.00548);
var nodeNum = new Array(4,4,3,10,5,14,7,10,7,8);
*/

//calculate median value of centrality and density
function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function setAxis(value){
	var interval = (Math.max.apply(null,value) - Math.min.apply(null,value)) / 4;
	var maxValue = Math.max.apply(null,value);
	var minValue = Math.min.apply(null,value);
	if(interval == 0){
		var max = 4.75;
		interval = maxValue / 2.5;
	}
	else{
		var max = maxValue / interval;
		var min = minValue / interval;
	}
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
	
	if(max>=4&&max<=4.25){
		max = 4.5 * interval;
		min = -0.5 * interval;
	}
	else if(max>4.25&&max<=4.5){
		max = 4.75 * interval;
		min = -0.25 * interval;
	}
	else if(max>4.5&&max<=4.75){
		max = 5 * interval;
		min = 0 * interval;
	}
	else if(max>4.75&&max<=5){
		max = 5.25 * interval;
		min = 0.25 * interval;
	}
	var info = {"max":max,"min":min};
	return info;
}

$(function (){
	var chart = new Highcharts.chart('container', {
		chart: {
			type: 'bubble',
			plotBorderWidth: 1,
		},
		
		credits: {
			enabled: false
		},

		legend: {
			align: 'center',
			verticalAlign: 'bottom',
			//layout: 'horizatal',
			x: 0,
			y: 0,
			width: 400,
			backgroundColor: '#FCFFC5',
			borderColor: '#C98657',
			borderWidth: 1
		},

		title: {
			text: 'Centrality and Density of Clusters'
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
						console.log(this.chart.xAxis);
					}
				}
			}
		},

		series: 
			[{
				name: "Quarter 4 - upper left"
			},{
				name: "Quarter 1 - upper right"
			},{
				name: "Quarter 3- lower left"
			},{
				name: "Quarter 2 - lower right"
			}],
			
	});
	
	function setSeries(){
		setData();
		chart.series[0].setData([]);
		chart.series[1].setData([]);
		chart.series[2].setData([]);
		chart.series[3].setData([]);
		var c_median = median(centrality);
		var d_median = median(density);
		for( var i=0 ; i<mydata.length ; i++){
			var cen = parseFloat(mydata[i].centrality.toFixed(6));
			var den = parseFloat(mydata[i].density.toFixed(6));
			//console.log(c_median,d_median);
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
		//console.log(xAxisMax+" ; "+xAxisMin);
		chart.xAxis[0].setExtremes(xAxisMin, xAxisMax);
		chart.yAxis[0].setExtremes(yAxisMin, yAxisMax);
	}
	setSeries();	//draw default chart
	//----------------Countries selections-------------------------------
	$(document).ready(function(){
		for(var i=0;i<28;i++){
			$("#country").append("<option value='"+country[i][0]+"'>"+country[i][1]+"</option>");
		}
		$("#country").find("option[value="+country[visibleSeriesIndex][0]+"]").attr("selected",true);
		$("#country").change(function(){
			var checkText = $("#country").find("option:selected").text(); 
			var checkValue = $("#country").val();
			var checkIndex = $("#country").find("option:selected").index();
			//alert("change the chart with data of "+checkText+"("+checkValue+")");
			visibleSeriesIndex = checkIndex;
			setLocalCountry(visibleSeriesIndex);
			setSeries();
		});
	});
	//----------------New Threshold selections-------------------------------
	$(document).ready(function(){
		for(var i=0;i<5;i++){
			$("#threshold").append("<option value="+i+">"+'co: '+threshold[i][0]+' ; ps1: '+threshold[i][1]+' ; ps2: '+threshold[i][2]+"</option>");
		}
		$("#threshold").find("option[value="+thIndex+"]").attr("selected",true);
		$("#threshold").change(function(){
			/*
			paramArray=$("#threshold").val().split(",");
			co = paramArray[0];
			ps1 = paramArray[1];
			ps2 = paramArray[2];
			*/
			var value = $("#threshold").val();
			co = threshold[value][0];
			ps1 = threshold[value][1];
			ps2 = threshold[value][2];
			setLocalThreshold(value);
			setSeries();
		});
	});
	/*
	//----------------Old Threshold selections-------------------------------
	<div style="margin-top: 50px">
		<form>
			<span title="Minimal co-occurrence: &#10;connections will be elimated if the co-occurrence is less than this threshold"><label>co-occurrence</label></span><br>
			<input type="text" name="co" id="co" style="width : 115px" value=0><br>
			<span title="Maximal internal links: &#10;for one cluster, it has connections inside this cluster no more than this threshold"><label>pass1link</label></span><br>
			<input type="text" name="ps1" id="ps1" style="width : 115px" value=10><br>
			<span title="Maximal external links: &#10;for one cluster, it has connections with other cluster no more than this threshold"><label>pass2link</label></span><br>
			<input type="text" name="ps2" id="ps2" style="width : 115px" value=10><br><br>
			<input type="button" value="submit" id="submit">
		</form>
	</div>
	$(document).ready(function(){
		$("#submit").on('click', function () {
			co = $("#co").val();
			ps1 = $("#ps1").val();
			ps2 = $("#ps2").val();
			
			//--------Redraw charts according to threshold---------------
			//alert("Change chart according to the threshold\n"+"co_occurrence: "+co+"\n"+"pass1link: "+ps1+"\n"+"pass2link: "+ps2);
			setSeries();
		});
	});
	*/
	//------------------------Reset data for series when timeslider change---------------------
	$("#slider-range").bind("valuesChanged", function(e, data){
		start_date = num2date(data.values.min/2);
		end_date = num2date((data.values.max-2)/2);
		changeTimeRange(start_date,end_date);
		$("#but1,#but2,#but3,#but4").css("background-color", "buttonface");
		//console.log(start_date+";"+end_date+";"+visibleSeriesIndex);
		setSeries();
	});
});

//---------------SQL query for finding centrality with threshold-----
/*
statistics_id=1(SELECT id FROM statistics WHERE from_date="" AND to_date="" AND Country="")
cluster=1(SELECT DISTINCT cluster FROM skill WHERE cluster!=0) ---loop

​SELECT strength FROM skill_connection 
WHERE ((`skill1_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1) 
	AND `skill2_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster!=0 AND cluster!=1))
    OR (`skill1_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster!=0 AND cluster!=1)
    AND `skill2_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1)))
    AND `statistics_id`=1
    AND `co_occurrence`>=2
    ORDER BY `strength` DESC
    LIMIT 2
*/
//---------------SQL query for finding density with threshold---------
/*
SELECT * FROM skill_connection 
WHERE `skill1_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=3 AND cluster=3) 
	AND `skill2_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=3 AND cluster=3)
    AND `statistics_id`=3 
    AND `co_occurrence`>=2
    ORDER BY `strength` DESC
    LIMIT 4
*/
//---------------SQL query for finding numNode with threshold---------
/*
SELECT count(c.name) FROM
(SELECT DISTINCT b.skill as name FROM
(SELECT a.`skill1_id` as skill FROM
(SELECT * FROM skill_connection WHERE `skill1_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1) AND `skill2_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1) AND `statistics_id`=1 AND `co_occurrence`>=2 ORDER BY `strength` DESC LIMIT 4) as a) as b
UNION
SELECT DISTINCT b.skill as name FROM
(SELECT a.`skill2_id` as skill FROM
(SELECT * FROM skill_connection WHERE `skill1_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1) AND `skill2_id` in (SELECT `name` FROM `skill` WHERE `statistics_id`=1 AND cluster=1) AND `statistics_id`=1 AND `co_occurrence`>=2 ORDER BY `strength` DESC LIMIT 4) as a) as b) as c
*/