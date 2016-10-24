document.addEventListener('DOMContentLoaded', function() {
    chart1 = Highcharts.chart('container1', {
        credits: { enabled: false },
        tooltip: { enabled: false },
        title: {
            text: 'chart 1'
        },
        xAxis: {
            type: 'linear'
        },
        yAxis: {
            title: {
                text: 'some text'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                },
                threshold: null,
                fillOpacity: 0,
                lineWidth: 1
            }
        },

        series: [{
            data: data1
        }],

        soniChart:{
            ticker: {
                //enabled: false
            }
        }
    });


    chart2 = Highcharts.chart('container2', {
        credits: { enabled: false },
        tooltip: { enabled: false },
        title: {
            text: 'chart 2'
        },
        xAxis: {
            type: 'linear'
        },
        yAxis: {
            title: {
                text: 'some text'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                },
                threshold: null,
                fillOpacity: 0,
                lineWidth: 1
            }
        },

        series: [{
            data: data1
        },
        {
            data: data2
        }
        ],

        soniChart:{
            ticker: {
                //enabled: false
            }
        }
    });
}, false);