(function (H) {
    Highcharts.Chart.prototype.callbacks.push(function (chart) {
        if ( !chart.options.soniChart ) return chart; // return a usual chart if soniChart options is not given

        var options = chart.options.soniChart;
        chart.sonification = {};   // all sonification variables will be stored in chart.sonification
        var s = chart.sonification;
        s.offset = 0; // position
        s.speed = options.speed || 15;  // playspeed
        s.oscTypes = ['sine', 'square', 'triangle', 'sawtooth']; // supported osc types
        s.oscType = options.oscType || 'sine'; // default to triangle
        s.partial = options.partial || 6;
        s.running = false; // true if sound is playing
        s.Oscs = []
        if ( options.mapping ) {
            s.mapping = options.mapping;
        } else {
            s.mapping = function( input ){ return input; };
        }
        for ( i in chart.series ) {
            s.Oscs.push( new Tone.Oscillator(0, s.oscType + s.partial ).toMaster() ); // Oscillator sound player
        }

        // ticker: a verticle line shows the position of player
        if ( ! options.ticker ) options.ticker = {};
        s.tickerOptions = {
            id: 'TICKER',
            enabled: ((options.ticker.enabled != null) ? options.ticker.enabled : true),
            value: chart.series[0].data[s.offset].x,
            color: options.ticker.color || 'red',
            width: options.ticker.width || 2,
        };
        if ( s.tickerOptions.enabled ) s.ticker = chart.xAxis[0].addPlotLine(s.tickerOptions).svgElem;

        // shaker: a horizontal line shows current frequency of each channel
        if ( ! options.shaker ) options.shaker = {};
        s.shakers = [];
        for ( i in chart.series ) {
            var shakerOptions = {
                id: 'SHAKER',
                enable: ((options.shaker.enabled != null) ? options.shaker.enabled : true),
                color: options.shaker.color || 'black',
                value : chart.series[i].data[s.offset].y,
                width: options.shaker.width || 1
            };
            s.shakers.push( chart.yAxis[0].addPlotBand(shakerOptions).svgElem );
        }

        H.addEvent(chart.container, 'click', function (event) {
            if ( !event.point && !event.xAxis ) return; // return if this is a drag click event
            var newOffset = Math.floor(event.point ? event.point.x : event.xAxis[0].value);
            if ( newOffset < 0 || newOffset > chart.xAxis[0].max ) return;
            s.offset =  newOffset;
            if ( !s.running ) { // redraw ticker and shaker when not running
                for ( i in s.Oscs ) {
                    if ( !chart.series[i].data[s.offset] ) continue;
                    var ySpan = chart.yAxis[0].max - chart.yAxis[0].min;
                    s.shakers[i].translate(0, -(chart.plotHeight * chart.series[i].data[s.offset].y / ySpan));
                }
                if ( s.tickerOptions.enabled ) s.ticker.translate(s.offset / chart.xAxis[0].max * chart.plotWidth, 0);
            }
        });

        var loop = function(){
            if ( s.running ) {
                for ( i in s.Oscs ) {
                    if ( !chart.series[i].data[s.offset] ) continue;
                    var value = chart.series[i].data[s.offset].y;
                    s.Oscs[i].frequency.value = s.mapping(value);
                    var ySpan = chart.yAxis[0].max - chart.yAxis[0].min;
                    s.shakers[i].translate(0, -(chart.plotHeight * chart.series[i].data[s.offset].y / ySpan));
                }
                if ( s.tickerOptions.enabled ) s.ticker.translate(s.offset / chart.xAxis[0].max * chart.plotWidth, 0);

                s.offset = (s.offset + 1) % chart.series[0].data.length;
                setTimeout( loop, s.speed )
            }
        }

/*********************public functions:****************************/
        /****** chart.play ******
            play sound start from beginning
        *************************/
        chart.play = function() {
            s.offset = 0;
            for ( i in s.Oscs ) {
                s.Oscs[i].start();
            }
            //s.osc.start();
            s.running = true;
            loop();
        };

        /****** chart.play ******
            play sound from previous stop position
        *************************/
        chart.start = function() {
            for ( i in s.Oscs ) {
                s.Oscs[i].start();
            }
            //s.osc.start();
            s.running = true;
            loop();
        };
        /****** chart.stop ******
            stop playing sound
        *************************/
        chart.stop = function() {
            s.running = false;
            for ( i in s.Oscs ) {
                s.Oscs[i].stop();
            }
        }


        /****** chart.mapping ******
            change the value-sound mapping,
            the default mapping is directed mapping

            input:
                mappingFn: must be a function that comsumes a
                    number, return an integer or a string
                    represents frequency
        ****************************/
        chart.mapping = function( mappingFn ) {
            s.mapping = mappingFn;
        }

        /* TODO
        chart.volumn = function(v) {
            s.osc.volumn = v;
        }

        chart.phase = function(p) {
            s.osc.phase = p;
        }
        chart.speed = function (sp) {
            s.speed = sp;
        };
        */
    });
}(Highcharts));