/*
 * GitMorrisHub
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

  var user = 'github'; // change to this to the desired username
  var repo = 'developer.github.com'; // change to this to the desired repo of the specified user
  var statsURL = 'https://api.github.com/repos/'+ user +'/'+ repo +'/stats/commit_activity';

  $.ajax({
    url: statsURL,
    dataType: 'json',
    cache: true,
    success: function (data) {

      // This particular URL returns a response of all commits
      // on a user's repo over the past year ending with today.
      // The call is organized into an array of 52 weeks, with
      // week 52 being the current week (this week). Each week
      // contains an array of the number of commits a per day on
      // that repo. "data[51]" is the 52nd week of the past year

      // Example request for getting data[32].days (commits per day for week 33 of the past year)
      // Returns a response of an array[7] = [8, 1, 3, 2, 6, 7, 6]
      // Sunday's commit count = 8, Monday's commit count = 1, and so on...

      var weekDays = data[51].days;

      console.log(data[51].days); // this week's array of commits

      var day_data = [
        {"dayOfWeek": "S", "commits": weekDays[0]},
        {"dayOfWeek": "M", "commits": weekDays[1]},
        {"dayOfWeek": "T", "commits": weekDays[2]},
        {"dayOfWeek": "W", "commits": weekDays[3]},
        {"dayOfWeek": "T", "commits": weekDays[4]},
        {"dayOfWeek": "F", "commits": weekDays[5]},
        {"dayOfWeek": "S", "commits": weekDays[6]}
      ];

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
        parseTime: false // Turns of auto time parsing of the x-axis values
      });

    }
  });

});
