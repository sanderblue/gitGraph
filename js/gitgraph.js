/*
 * gitGraph.js
 *
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
 *
 * Thanks to Morris.js and Moment.js
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {

    var self = this;

    $.fn.gitGraph = function(options) {

        return this.each(function () {

            if (undefined == $(this).data('gitGraph')) {

                var plugin = new $.gitGraph(this, options);

                $(this).data('gitGraph', plugin);
            }
        });
    };

    $.gitGraph = function(element, options) {
        var plugin        = this;
        var graph_element = element;

        var settings = {
            html: options.html,
            user: options.user,
            repo: options.repo,
            commits: []
        };

        var statsURL = 'https://api.github.com/repos/'+settings.user+'/'+settings.repo+'/stats/commit_activity';

        var getCommits = function () {
                return $.ajax({
                        url: statsURL,
                        type: 'GET',
                        contentType: 'json',
                        dataType: 'json'
                    });
                };

        $.when(getCommits()).done(function (data, b) {

            if ($.isEmptyObject(data)) {
                console.log(graph_element);

                var height     = $(graph_element).height();
                var width      = $(graph_element).width();
                var element_id = $(graph_element).attr('id');

                $(graph_element).append('Something wasn\'t quite right. The data set was empty! Please try again.');
            }

            var thisWeeksCommits = data[51].days;
            var lastWeeksCommits = data[50].days;
            var twoWeeksCommits  = lastWeeksCommits.concat(thisWeeksCommits);
            var dayIndex         = new Date().getDay();

            // Organize the x-axis days depending the day of the week
            var thisWeeksDays = new Array(7);
                thisWeeksDays[0] = moment().utc().format('ddd');
                thisWeeksDays[1] = moment().utc().add('days', 6).format('ddd');
                thisWeeksDays[2] = moment().utc().add('days', 5).format('ddd');
                thisWeeksDays[3] = moment().utc().add('days', 4).format('ddd');
                thisWeeksDays[4] = moment().utc().add('days', 3).format('ddd');
                thisWeeksDays[5] = moment().utc().add('days', 2).format('ddd');
                thisWeeksDays[6] = moment().utc().add('days', 1).format('ddd');

            // Organize this week's indices using Moment.js
            var thisWeekIndex = new Array(7);
                thisWeekIndex[0] = moment().utc().format('d');
                thisWeekIndex[1] = moment().utc().add('days', 1).format('d');
                thisWeekIndex[2] = moment().utc().add('days', 2).format('d');
                thisWeekIndex[3] = moment().utc().add('days', 3).format('d');
                thisWeekIndex[4] = moment().utc().add('days', 4).format('d');
                thisWeekIndex[5] = moment().utc().add('days', 5).format('d');
                thisWeekIndex[6] = moment().utc().add('days', 6).format('d');

            // Organize last week's indices using Moment.js
            var lastWeekIndex = new Array(7);
                lastWeekIndex[0] = moment().utc().format('d');
                lastWeekIndex[1] = moment().utc().add('days', 1).format('d');
                lastWeekIndex[2] = moment().utc().add('days', 2).format('d');
                lastWeekIndex[3] = moment().utc().add('days', 3).format('d');
                lastWeekIndex[4] = moment().utc().add('days', 4).format('d');
                lastWeekIndex[5] = moment().utc().add('days', 5).format('d');
                lastWeekIndex[6] = moment().utc().add('days', 6).format('d');

            var twoWeeksIndices = lastWeekIndex.concat(thisWeekIndex);

            // Grab the correct array/set of indices from the last
            // two weeks of data depending on the day of the week
            var commitsIndices = twoWeeksIndices.slice(dayIndex, dayIndex+7);

            // Grab the correct array/set of data from the last
            // two weeks of data depending on the day of the week
            var sevenDaysCommits = twoWeeksCommits.slice(dayIndex+1, dayIndex+8);

            var g = [];
            var commitsObj = { g : g }

            $.each(sevenDaysCommits, function (k, v) {
                g.push(v);
            });

            var day_data = [
                { "dayOfWeek": thisWeeksDays[6], "commits": commitsObj.g[0] },
                { "dayOfWeek": thisWeeksDays[5], "commits": commitsObj.g[1] },
                { "dayOfWeek": thisWeeksDays[4], "commits": commitsObj.g[2] },
                { "dayOfWeek": thisWeeksDays[3], "commits": commitsObj.g[3] },
                { "dayOfWeek": thisWeeksDays[2], "commits": commitsObj.g[4] },
                { "dayOfWeek": thisWeeksDays[1], "commits": commitsObj.g[5] },
                { "dayOfWeek": thisWeeksDays[0], "commits": commitsObj.g[6] }
            ];

            plugin.settings = {}

            var $element = $(graph_element),
                 element = graph_element;

            // the "constructor"
            plugin.init = function() {

                plugin.settings = $.extend({}, settings, options);

                // Create the Morris.js graph based on the user provided data.
                return this,
                    Morris.Line({
                        element: settings.html,
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
            }
            plugin.init();

        }).fail(function (jqxhr, error, auth) {
            if (graph_element.innerHTML === "") {
                $(graph_element).append('There was a issue retrieving the data, please try again.');
            }
        });
    }

})(jQuery);
