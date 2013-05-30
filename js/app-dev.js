$(function () {

  var commits = [0,3,26,20,39,1,0];

  // Uses Moment.js to put the weekdays in reverse chronological order started with today.
  var thisWeeksDays = new Array();
    thisWeeksDays[0] = moment().format('ddd');
    thisWeeksDays[1] = moment().subtract('days', 1).format('ddd');
    thisWeeksDays[2] = moment().subtract('days', 2).format('ddd');
    thisWeeksDays[3] = moment().subtract('days', 3).format('ddd');
    thisWeeksDays[4] = moment().subtract('days', 4).format('ddd');
    thisWeeksDays[5] = moment().subtract('days', 5).format('ddd');
    thisWeeksDays[6] = moment().subtract('days', 6).format('ddd');
  // console.log(thisWeeksDays);

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
    { "dayOfWeek": thisWeeksDays[0], "commits": commits[d1] },
    { "dayOfWeek": thisWeeksDays[1], "commits": commits[d2] },
    { "dayOfWeek": thisWeeksDays[2], "commits": commits[d3] },
    { "dayOfWeek": thisWeeksDays[3], "commits": commits[d4] },
    { "dayOfWeek": thisWeeksDays[4], "commits": commits[d5] },
    { "dayOfWeek": thisWeeksDays[5], "commits": commits[d6] },
    { "dayOfWeek": thisWeeksDays[6], "commits": commits[d7] }
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