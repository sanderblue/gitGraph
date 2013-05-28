/*
 * GitMorrisHub
 * Author: Sander Blue - http://www.sanderblue.com
 * Copyright (c) 2013, Sander Blue All rights reserved.
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

      // Index 51 = the current week based off current UTC time
      var weekDays = data[51].days;

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
        parseTime: false
      });

    }
  });

});
