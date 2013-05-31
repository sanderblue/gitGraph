$(function () {

  /*
   * Date Prototype Tests
   */
  Date.prototype.dayOfWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }

  var n = new Date();
  var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

  var d = weekday[n.getDay()];
  // console.log(weekday[i]);

  var updatedArray = $.map(weekday, function(key, val) {
    var g = new Date().getDay();
    var h = g + g - val;

    return h >= 0 ? h: null; // return new array with values +1
  });
  console.log(updatedArray);


  var updatedWeek = $.map(weekday, function(key, val) {
    // console.log(key, val);

    var n = new Date();
    var weekday = new Array(7);
      weekday[0] = "Sun";
      weekday[1] = "Mon";
      weekday[2] = "Tues";
      weekday[3] = "Wed";
      weekday[4] = "Thur";
      weekday[5] = "Fri";
      weekday[6] = "Sat";

    var thisWeeksDays = new Array();
      thisWeeksDays[0] = weekday[val];
      thisWeeksDays[1] = weekday[val];
      thisWeeksDays[2] = weekday[val];
      thisWeeksDays[3] = weekday[val];
      thisWeeksDays[4] = weekday[val];
      thisWeeksDays[5] = weekday[val];
      thisWeeksDays[6] = weekday[val];

    // console.log(thisWeeksDays);
  });

  var obj = {};
    obj['today'] = d;
    obj['commits'] = 12;
  // console.log(obj);

  var day_data = [
    { "dayOfWeek": 1, "commits": 100 },
    { "dayOfWeek": 1, "commits": 75 },
    { "dayOfWeek": 1, "commits": 50 },
    { "dayOfWeek": 1, "commits": 75 },
    { "dayOfWeek": 1, "commits": 50 },
    { "dayOfWeek": 1, "commits": 75 },
    { "dayOfWeek": 1, "commits": 100 }
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
    gridTextSize: 10,
    parseTime: false // Turns of auto time parsing of the x-axis values
  });

});

  function sortWithIndeces(toSort) {
    for (var i = 0; i < toSort.length; i++) {
      toSort[i] = [toSort[i], i];
    }
    toSort.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
      toSort.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
  }

  var test = ['b', 'c', 'd', 'a'];
  sortWithIndeces(test);
  alert(test.sortIndices.join(","));