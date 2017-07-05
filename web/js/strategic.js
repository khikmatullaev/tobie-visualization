var cluster = new Array(1,2,3,4,5,6,7,8,9,10);
var density = new Array(0.00034,0.00058,0.00047,0.00020,0.00110,0.00045,0.00072,0.00020,0.00028,0.00039);
var centrality = new Array(0.00698,0.00169,0.00715,0.00318,0.00227,0.00725,0.00325,0.00450,0.00075,0.00548);
var nodeNum = new Array(4,4,3,10,5,14,7,10,7,8);

var mydata = new Array();
for( var i=0; i<density.length; i++ ){
    mydata[i] = new Array();
    mydata[i]["x"] = centrality[i];
    mydata[i]["y"] = density[i];
    mydata[i]["z"] = nodeNum[i];
    mydata[i]["name"] = cluster[i];
    mydata[i]["color"] = color[cluster[i]];
}
//calculate median value of centrality and density
function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

$(function (){
    //$('#container').highcharts({
    var chart = new Highcharts.chart('container', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        credits: {
            enabled: false
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 40,
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
            },
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: median(centrality),
                label: {
                    rotation: 0,
                    y: 15,
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Median Centrality: ' + median(centrality)
                },
                zIndex: 3
            }]
        },


        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Density'
            },
            //labels: {
            //    format: '{value} gr'
            //},
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: median(density),
                label: {
                    align: 'right',
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Median Density: ' + median(density),
                    x: -10
                },
                zIndex: 3
            }]
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
                }
            },
            bubble: {
                minSize:3,
                maxSize:50
            },
        },

        series: [{
            name: "quarter 1"
        },{
            name: "quarter 2"
        },{
            name: "quarter 3"
        },{
            name: "quarter 4"
        }]

    });

    for( var i=0 ; i<mydata.length ; i++){
        //series[0] is the upper right quarter
        if(mydata[i].x>=median(centrality)&&mydata[i].y>=median(density)){
            chart.series[0].addPoint({x:mydata[i].x, y:mydata[i].y, z:mydata[i].z, name:mydata[i].name, color:mydata[i].color});
        }
        //series[1] is the lower right quarter
        else if(mydata[i].x>=median(centrality)&&mydata[i].y<=median(density)){
            chart.series[1].addPoint({x:mydata[i].x, y:mydata[i].y, z:mydata[i].z, name:mydata[i].name, color:mydata[i].color});
        }
        //series[2] is the lower left quarter
        else if(mydata[i].x<=median(centrality)&&mydata[i].y<=median(density)){
            chart.series[2].addPoint({x:mydata[i].x, y:mydata[i].y, z:mydata[i].z, name:mydata[i].name, color:mydata[i].color});
        }
        //series[3] is the upper left quarter
        else if(mydata[i].x<=median(centrality)&&mydata[i].y>=median(density)){
            chart.series[3].addPoint({x:mydata[i].x, y:mydata[i].y, z:mydata[i].z, name:mydata[i].name, color:mydata[i].color});
        }
    }
    //console.log(chart.series[0].data);
});

