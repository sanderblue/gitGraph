$(document).ready(function() {

    var newData = [
        { "dayOfWeek": "Mon", "commits": 30 },
        { "dayOfWeek": "Tue", "commits": 37 },
        { "dayOfWeek": "Wed", "commits": 11 },
        { "dayOfWeek": "Thu", "commits": 40 },
        { "dayOfWeek": "Fri", "commits": 24 },
        { "dayOfWeek": "Sat", "commits": 46 },
        { "dayOfWeek": "Sun", "commits": 68 }
    ];

    $( "#test" ).gitGraph({
        user: "edx",
        repo: "edx-platform"
        // gitData: newData
    });
    // edx / edx-platform
});