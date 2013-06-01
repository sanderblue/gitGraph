/*
 * gitGraph
 *
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
 *
 */

(function($) {

    var commit_data = [
        { "dayOfWeek": 1, "commits": 100 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 50 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 50 },
        { "dayOfWeek": 1, "commits": 75 },
        { "dayOfWeek": 1, "commits": 100 }
    ];

    $.gitGraph = function(element, options) {

        // gitGraph default settings
        var settings = {

            user: 'sanderblue',
            repo: 'gitGraph',
            gitData: commit_data,
            update: function() {}
        }

        var plugin = this;

        plugin.settings = {} // this holds the merged default and user-provided options

        var $element = $(element),
             element = element;

        // the "constructor"
        plugin.init = function() {

            // allows user to override gitGraph defaults
            plugin.settings = $.extend({}, settings, options);

            // Create the graph based on the user provided data.
            return this,
                Morris.Line({
                  element: 'test', // ID of your chart div
                  data: plugin.settings.gitData,
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

        }

        plugin.init(); // initialize the plguin and call the "constructor" method

    }

    $.fn.gitGraph = function(options) {
        console.log(options);

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('gitGraph')) {

                var plugin = new $.gitGraph(this, options);

                $(this).data('gitGraph', plugin); // storing the object for accessibility
            }

        });
    }

})(jQuery);