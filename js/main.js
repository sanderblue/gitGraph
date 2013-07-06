$(function($){

    var GitGraph = function () {};

    var apiURL = 'https://api.github.com';

    GitGraph.prototype.getGitHubData = function(a) {
        console.log("Main js: ", a);

        var allUsersURL = 'https://api.github.com/users';

        return $.getJSON(allUsersURL, function (data) {
            console.log("prototype data: ", data);
        });
    };

    var getGitHubData = function () {
        // var userSearchURL = apiURL + '/legacy/user/search/sanderblue';
        var userSearchURL = apiURL + '/users';

        return $.ajax({
                url: userSearchURL,
                type: 'GET',
                contentType: 'json',
                dataType: 'json'
            });
    };

    // var userRepoURL = apiURL + 'repos/'+ user +'/'+ repo +'/stats/commit_activity';

    $.when(getGitHubData()).done(function (data) {
        console.log("Promise done: ", data);

        var optionsDiv = $('#users');

        $.each(data, function () {
            var h = $('<option>').val(this.login).text(this.login);

            $(h).appendTo(optionsDiv);
        });
    });
});
