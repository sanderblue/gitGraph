/*
 * gitGraph
 *
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
 *
 */

(function($) {

    $.gitGraph = function(element, options) {
        console.log(options);

        var commit_data = new getCommitData();
        var repoCommits = commit_data.data;

        function test(settings) {
                window[settings] = {
                    user: options.user,
                    repo: options.repo,
                    gitData: repoCommits
                };
            }

        test('bar');

        var settings = {
            user: bar.user,
            repo: bar.repo,
            git: repoCommits
        };

        function getCommitData() {

            test('bar'); // note that the property name is a string, not a variable

            var user = bar.user;
            var repo = bar.repo;
            var statsURL = 'https://api.github.com/repos/'+ user +'/'+ repo +'/stats/commit_activity';
            var result = "";

            var testURL = 'http://sanderblue.com/data/gitGraph/twoweeks.json';

            $.ajax({
                url: testURL,
                async: false,
                dataType: 'jsonp',
                success: function (data, day_data, user, repo) {

                  console.log(data);

                    var g = [];
                    var f = { g : g }
                    var thisWeek = data[0].days.reverse(); // will eventually need two weeks worth of data to get it all to work
                    var lastWeek = data[1].days.reverse();
                    var twoWeeks = thisWeek.concat(lastWeek);

                    var n = 0;
                    var commits = twoWeeks.slice(n+6, n+13); // need to rework this to auto update (week index)
                    console.log(twoWeeks);
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
                    console.log(result);
                }
            });
            result = { "data": result, "user": user, "repo": repo };
            return result;
        }

        test('data');

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
                  data: data.gitData,
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
        // console.log(options);
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