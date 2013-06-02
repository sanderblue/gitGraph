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

    // function getCommitsData() {

        var user = 'zurb'; // change to this to the desired username
        var repo = 'foundation'; // change to this to the desired repo of the specified user
        var statsURL = 'https://api.github.com/repos/'+ user +'/'+ repo +'/stats/commit_activity';

        function testAjax() {

            var result = "";

            $.ajax({
                url: statsURL,
                async: false,
                dataType: 'json',
                success: function (data, day_data) {
                    var g = [];
                    var f = { g : g }
                    var commits = data[51].days;

                    console.log(f);
                    console.log(commits);
                    // Uses Moment.js to put the weekdays in reverse chronological order started with today.
                    var thisWeeksDays = new Array(7);
                      thisWeeksDays[0] = moment().utc().format('ddd');
                      thisWeeksDays[1] = moment().utc().subtract('days', 1).format('ddd');
                      thisWeeksDays[2] = moment().utc().subtract('days', 2).format('ddd');
                      thisWeeksDays[3] = moment().utc().subtract('days', 3).format('ddd');
                      thisWeeksDays[4] = moment().utc().subtract('days', 4).format('ddd');
                      thisWeeksDays[5] = moment().utc().subtract('days', 5).format('ddd');
                      thisWeeksDays[6] = moment().utc().subtract('days', 6).format('ddd');

                    // Uses Moment.js to create an array of values in the
                    // proper order based on the current day of the week.
                    // Used to resort the commits array based on the current day of the week.
                    var newWeekIndex = new Array(7);
                      newWeekIndex[0] = moment().utc().format('d');
                      newWeekIndex[1] = moment().utc().subtract('days', 1).format('d');
                      newWeekIndex[2] = moment().utc().subtract('days', 2).format('d');
                      newWeekIndex[3] = moment().utc().subtract('days', 3).format('d');
                      newWeekIndex[4] = moment().utc().subtract('days', 4).format('d');
                      newWeekIndex[5] = moment().utc().subtract('days', 5).format('d');
                      newWeekIndex[6] = moment().utc().subtract('days', 6).format('d');

                    $.each(newWeekIndex, function (k, v) {
                      g.push(v); // push new values to array g
                    });

                    var day_data = [
                        { "dayOfWeek": thisWeeksDays[6], "commits": commits[g[6]] },
                        { "dayOfWeek": thisWeeksDays[5], "commits": commits[g[5]] },
                        { "dayOfWeek": thisWeeksDays[4], "commits": commits[g[4]] },
                        { "dayOfWeek": thisWeeksDays[3], "commits": commits[g[3]] },
                        { "dayOfWeek": thisWeeksDays[2], "commits": commits[g[2]] },
                        { "dayOfWeek": thisWeeksDays[1], "commits": commits[g[1]] },
                        { "dayOfWeek": thisWeeksDays[0], "commits": commits[g[0]] }
                      ];

                result = day_data;

                // handleData(day_data);
                }
            });
            return result;
        } // end function testAjax

        var object = new testAjax();
        console.log(object);


    $.gitGraph = function(element, options) {

        // gitGraph default settings
        var settings = {

            user: 'sanderblue',
            repo: 'gitGraph',
            gitData: object,
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