$(function($){

    var apiURL = 'https://api.github.com';

    var searchURL        = 'https://api.github.com/users';
    var local_users_data = 'js/data/users.json';

    var getUsers = $.ajax({
            url: local_users_data,
            type: 'GET',
            contentType: 'json',
            dataType: 'json'
        });

    $.when(getUsers).done(function (users) {

        // The built typeahead "datums"
        user_datums = [];

        $.each(users, function (i, user) {
            var user = {
                value: user.login,
                tokens: [
                    user.login,
                    user.email
                ],
                id: user.id,
                email: user.email,
                url: user.html_url,
                avatar: user.avatar_url
            }
            user_datums.push(user);
        });

        console.log(user_datums);

        $('.users-search')
            .typeahead([
            {
              name: 'users',
              local: user_datums,
              template: function(data) { return '<span class="search_suggestion"><img src="'+ data.avatar +'" class="user_avatar">'+ data.value +'</span>'; }
            }
        ])

        $.fn.enterKey = function (fnc) {
            return this.each(function () {

                console.log("this", this);

                $(this).keypress(function (ev) {

                    var keycode = (ev.keyCode ? ev.keyCode : ev.which);
                    if (keycode == '13') {

                        console.log("Funcion", ev.keyCode );

                        fnc.call(this, ev);
                    }
                })
            })
        }

        var buildGitGraph = function(user, repo) {

            console.log("Build graph: ", user, repo)

            $( "#myGitGraph" ).gitGraph({
                html: "myGitGraph",
                user: user,
                repo: repo
            });
        }

        var buildDropdown = function (username) {

            var userReposURL = apiURL + '/users/'+ username +'/repos';

            var getRepos = $.ajax({
                                url: userReposURL,
                                type: 'GET',
                                contentType: 'json',
                                dataType: 'json'
                            });

            $.when(getRepos).done(function (repos) {

                var repo_options_element = $('#user-repo-options');

                console.log(repo_options_element)

                $(repo_options_element).children().remove();

                $.each(repos, function (i, repo) {

                    var repo_name = repo.name;

                    $(repo_options_element).append('<option value='+ repo_name +'>'+ repo_name +'</option>');

                });

                $(repo_options_element).on('change', function () {

                    var username_value = $('#search').val();
                    var repo_value     = $(this).val();

                    console.log("username: ", username_value);
                    console.log("repo: ", repo_value);

                    return new buildGitGraph(username_value, repo_value);
                });

            });
        };


        $('#search').on('keydown', function (event) {

            $('.tt-suggestion').on('click', function (event) {
                console.log('Clicked! Here is the user: ', $(event.target).text() );
                var username = $(event.target).text();

                return new buildDropdown(username);
            });

        }).enterKey(function (event) {
            console.log('Enter!', event.target);

            var username = event.target.value;

            return new buildDropdown(username);
        });

    });


    // $.when(getUserRepos()).done(function (data) {
    //     // console.log("Promise done: ", data);

    //     var optionsDiv = $('#user-users-options');

    //     $(optionsDiv).children().remove();

    //     $.each(data, function () {

    //         // $('<option>').val(this.name).text(this.name);
    //         console.log("Promise done: ", data);

    //         $(optionsDiv).append('<option value=' + this.name + '>' + this.name + '</option>');
    //     });
    // });

    $('.github-users-dropdown').on('change', function() {

        console.log("User value: ", user_value );

        // var existingGraph = $('body').find('#myGitGraph').replaceWith('<div id="myGitGraph" style="height: 300px; width:660px;">');

        var user_value = $(user_value).val()
        var repo_value = $(this).val();

        console.log("User value", user_value);
        console.log("Changed repo value", repo_value);

        var b = getUserRepos(user_value);

        // $( "#myGitGraph" ).gitGraph({
        //     html: "myGitGraph",
        //     user: user_value,
        //     repo: changed_repo_value
        // });

    });

    var user_value = function (value) {
        console.log("User value function fired", value);
    }

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
