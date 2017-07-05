function getData(month,year)
{
    var result = new Array();

    $.ajax({
        url: 'occurrencedb',
        type: "GET",
        data:{month:month, year:year},
        dataType: "json",
        async: false,
        error: function(){
            alert('Error loading XML document');
        },
        success: function(data){
            result = data;
        }
    });

    return result;
}

function drawCharts(data)
{
    var count = new Array();
    var skill = new Array();

    for( var i = 0; i < data.length; i++ )
    {
        skill[i] = data[i]['name'];
        count[i] = data[i]['occurrence'];
    }

    $(function () {
        var chart = new Highcharts.chart('container', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Occurence of Skills'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: skill,
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
                layout: 'vertical',
                x: 0,
                y: 40,
                borderColor: '#C98657',
                borderWidth: 1
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
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
                data: count
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
    });
}

var data = getData();
drawCharts(data);
