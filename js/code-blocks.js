/*
 * gitGraph
 *
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
 *
 */

(function ( $ ) {
    var day_data = [
        { "dayOfWeek": 1, "commits": 100 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 50 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 50 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 100 }
    ];

    // Start by creating some methods
    var methods = {
        init : function(options, morrisGraph) {
            var settings = $.extend({
                data: day_data,
            }, options );

            // Create the graph based on the user provided data.
            return this,
                Morris.Line({
                  element: 'test', // ID of your chart div
                  data: day_data,
                  xkey: 'dayOfWeek',
                  ykeys: ['commits'],
                  labels: ['commits'],
                  lineWidth: 1.75,
                  lineColors:['#479201'],
                  pointSize: 2.75,
                  pointWidths: [1],
                  pointStrokeColors: ['#ffffff'],
                  smooth: true,
                  continuousLine: true,
                  hideHover: true,
                  gridTextSize: 10,
                  parseTime: false // Turns off auto time parsing of the x-axis values
                });
        },
        show : function( morrisGraph ) {

        },
        // hide : function( ) { },// GOOD
        update : function( ) {
            // return this.text("blah blah blah").css('background', 'red');
        }
    };

    $.fn.tooltip = function(options, methodOrOptions) {

        var settings = $.extend({
            padding: "20px"
        }, options );

        // Create the graph based on the settings variable.
        // return this.css({
        //     padding: settings.padding,
        // });

        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };

    $.fn.gitGraph = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            username: "sanderblue",
            backgroundColor: "black"
        }, options );

        // Create the graph based on the settings variable.
        return this.css({
            username: settings.username,
            backgroundColor: settings.backgroundColor
        });

    };

}( jQuery ));