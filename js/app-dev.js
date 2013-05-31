$(function () {

  var commits = [0, 1, 2, 3, 4, 5, 6];
  var dayIndex = new Date().getDay();
  var thisWeek = ["Sun0","Mon1","Tues2","Wed3","Thu4","Fri5","Sat6"];
  var lastWeek = ["Sun0","Mon1","Tues2","Wed3","Thu4","Fri5","Sat6"];
  var lastLastWeek = ["Sun0","Mon1","Tues2","Wed3","Thu4","Fri5","Sat6"];

  // Uses Moment.js to put the weekdays in reverse chronological order started with today.
  var thisWeeksDays = new Array();
    thisWeeksDays[0] = moment().format('ddd');
    thisWeeksDays[1] = moment().subtract('days', 1).format('ddd');
    thisWeeksDays[2] = moment().subtract('days', 2).format('ddd');
    thisWeeksDays[3] = moment().subtract('days', 3).format('ddd');
    thisWeeksDays[4] = moment().subtract('days', 4).format('ddd');
    thisWeeksDays[5] = moment().subtract('days', 5).format('ddd');
    thisWeeksDays[6] = moment().subtract('days', 6).format('ddd');
  console.log(thisWeeksDays);

  var newWeekIndex = new Array();
    newWeekIndex[0] = moment().format('d');
    newWeekIndex[1] = moment().subtract('days', 1).format('d');
    newWeekIndex[2] = moment().subtract('days', 2).format('d');
    newWeekIndex[3] = moment().subtract('days', 3).format('d');
    newWeekIndex[4] = moment().subtract('days', 4).format('d');
    newWeekIndex[5] = moment().subtract('days', 5).format('d');
    newWeekIndex[6] = moment().subtract('days', 6).format('d');
  // console.log(newWeekIndex);

  var j = $.map(newWeekIndex, function(value) {
    return value;
  });
  // console.log(j);

  var g = [];
  var f = { g : g }
  console.log(f);

  $.each(newWeekIndex, function (k, v) {
    g.push(v);
  });
  // console.log(g);

  var d1 = g[0];
  // console.log(d1);

  var day_data = [
    { "dayOfWeek": thisWeeksDays[6], "commits": commits[g[6]] },
    { "dayOfWeek": thisWeeksDays[5], "commits": commits[g[5]] },
    { "dayOfWeek": thisWeeksDays[4], "commits": commits[g[4]] },
    { "dayOfWeek": thisWeeksDays[3], "commits": commits[g[3]] },
    { "dayOfWeek": thisWeeksDays[2], "commits": commits[g[2]] },
    { "dayOfWeek": thisWeeksDays[1], "commits": commits[g[1]] },
    { "dayOfWeek": thisWeeksDays[0], "commits": commits[g[0]] }
  ];
  console.log(day_data);

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

});