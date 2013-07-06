$(function($){

    var apiURL = 'https://api.github.com';

    $('.github-users-dropdown').on('change', function () {

        var changed_user_value = $(this).val();

        console.log(changed_user_value);

        var userReposURL = 'https://api.github.com/users/'+ changed_user_value +'/repos'

        var getUserRepos = function () {
            return $.ajax({
                url: userReposURL,
                type: 'GET',
                contentType: 'json',
                dataType: 'json'
            });
        };

        $.when(getUserRepos()).done(function (data) {
            console.log("Promise done: ", data);

            var optionsDiv = $('#user-repo-options');

            $(optionsDiv).children().remove();

            $.each(data, function () {
                var h = $('<option>').val(this.name).text(this.name);

                $(h).appendTo(optionsDiv);
            });
        });

        $('.github-repos-dropdown').on('change', function() {

            var existingGraph     = $('body').find('#myGitGraph').replaceWith('<div id="myGitGraph" style="height: 300px; width:660px;">');
            var change_repo_value = $(this).val();

            console.log(change_repo_value);
            // var newGraph = new changedGitGraph();

            // $(existingGraph).replaceWith(newGraph);

            $( "#myGitGraph" ).gitGraph({
                html: "myGitGraph",
                user: changed_user_value,
                repo: change_repo_value
            });

        });
    });

    // var user = changed_user_value;


    // + repo +'/stats/commit_activity';

    // var getGitHubData = function () {
    //     // var userSearchURL = apiURL + '/legacy/user/search/sanderblue';
    //     var userSearchURL = apiURL + '/users/1';

    //     return $.ajax({
    //             url: userSearchURL,
    //             type: 'GET',
    //             contentType: 'json',
    //             dataType: 'json'
    //         });
    // };

    // // var userRepoURL = apiURL + 'repos/'+ user +'/'+ repo +'/stats/commit_activity';

    // $.when(getGitHubData()).done(function (data) {
    //     console.log("Promise done: ", data);

    //     var optionsDiv = $('#users');

    //     $.each(data, function () {
    //         var h = $('<option>').val(this.login).text(this.login);

    //         $(h).appendTo(optionsDiv);
    //     });
    // });
});
