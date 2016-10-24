$(function() {
    mappingFunction = function() {
        var interval1 = $('#input1').val();
        var interval2 = $('#input2').val();
        var interval3 = $('#input3').val();
        var interval4 = $('#input4').val();
        var interval5 = $('#input5').val();
        var interval6 = $('#input6').val();
        return (function( input ) {
            if (input < -250) {
                return interval1;
            } else if ( input < -100 ) {
                return interval2;
            } else if ( input < 0 ) {
                return interval3;
            } else if ( input < 100 ) {
                return interval4;
            } else if ( input < 250 ) {
                return interval5;
            } else {
                return interval6;
            }
        })
    }
    chart = Highcharts.chart('container', {
        credits: { enabled: false },
        tooltip: { enabled: false },
        title: {
            text: 'Sound mapping'
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

        series: [
        {
            data: data2
        }
        ],

        soniChart:{
            oscType: 'sine',
            partial: '0',
            mapping: mappingFunction()
        }
    });

    changeMapping = function() {
        chart.mapping(mappingFunction());
    }
});