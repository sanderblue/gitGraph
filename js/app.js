/*
 * gitGraph
 *
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
 *
 * Notes: Additional features/upgrades, such as scalable OOP, will be added if/when time allows.
 *
 * Morris.js by Olly Smith - http://www.oesmith.co.uk/morris.js/
 */

$(function () {

  // GitHub API
  // GET repo commits per week over the last year. The year time range ends with today.
  // Example URL call = https://api.github.com/repos/:owner/:repo/stats/commit_activity

  var user = 'sanderblue'; // change to this to the desired username
  var repo = 'gitGraph'; // change to this to the desired repo of the specified user
  var statsURL = 'https://api.github.com/repos/'+ user +'/'+ repo +'/stats/commit_activity';

  $.ajax({
    url: statsURL,
    dataType: 'json',
    cache: true,
    success: function (data) {

      var thisWeek      = data[51].days;
      var lastWeek      = data[50].days;
      var lastlastWeek  = data[49].days;
      var threeWeeks    = thisWeek.concat(lastWeek, lastlastWeek);
      var dayIndex      = new Date().getDay();
      var prevSevenDays = threeWeeks.slice(dayIndex);
      var commits       = prevSevenDays;

      // This particular URL returns a response of all commits
      // on a user's repo over the past year ending with today.
      // The call is organized into an array of 52 weeks, with
      // week 52 being the current week (this week). Each week
      // contains an array of the number of commits a per day on
      // that repo. "data[51]" is the 52nd week of the past year

      // Example request for getting data[32].days (commits per day for week 33 of the past year)
      // Returns a response of an array[7] = [8, 1, 3, 2, 6, 7, 6]
      // Sunday's commit count = 8, Monday's commit count = 1, and so on...
      // var commits = data[51].days;

      // Uses Moment.js to put the weekdays in reverse chronological order started with today.
      var thisWeeksDays = new Array();
        thisWeeksDays[0] = moment().format('ddd');
        thisWeeksDays[1] = moment().subtract('days', 1).format('ddd');
        thisWeeksDays[2] = moment().subtract('days', 2).format('ddd');
        thisWeeksDays[3] = moment().subtract('days', 3).format('ddd');
        thisWeeksDays[4] = moment().subtract('days', 4).format('ddd');
        thisWeeksDays[5] = moment().subtract('days', 5).format('ddd');
        thisWeeksDays[6] = moment().subtract('days', 6).format('ddd');

      var days = new Array();
        days[0] = moment().format('d');
        days[1] = moment().subtract('days', 1).format('d');
        days[2] = moment().subtract('days', 2).format('d');
        days[3] = moment().subtract('days', 3).format('d');
        days[4] = moment().subtract('days', 4).format('d');
        days[5] = moment().subtract('days', 5).format('d');
        days[6] = moment().subtract('days', 6).format('d');

      var d1 = days[0];
      var d2 = days[1];
      var d3 = days[2];
      var d4 = days[3];
      var d5 = days[4];
      var d6 = days[5];
      var d7 = days[6];

      var day_data = [
        { "dayOfWeek": thisWeeksDays[0], "commits": commits[d7] },
        { "dayOfWeek": thisWeeksDays[1], "commits": commits[d6] },
        { "dayOfWeek": thisWeeksDays[2], "commits": commits[d5] },
        { "dayOfWeek": thisWeeksDays[3], "commits": commits[d4] },
        { "dayOfWeek": thisWeeksDays[4], "commits": commits[d3] },
        { "dayOfWeek": thisWeeksDays[5], "commits": commits[d2] },
        { "dayOfWeek": thisWeeksDays[6], "commits": commits[d1] }
      ];
      // console.log(day_data);

      // Set your desired options for your Morris.js line-chart
      Morris.Line({
        element: 'chart', // ID of your chart div
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
        parseTime: false // Turns of auto time parsing of the x-axis values
      });
    }

  });
});
