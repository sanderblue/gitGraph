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

            $("#myGitGraph").remove();

            $('.lead').after('<div id="myGitGraph" style="height: 300px; width:660px;"></div>')

            return $( "#myGitGraph" ).gitGraph({
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

                $(repo_options_element).children().remove();

                $.each(repos, function (i, repo) {

                    var repo_name = repo.name;

                    $(repo_options_element).append('<option value='+ repo_name +'>'+ repo_name +'</option>');

                });

                $(repo_options_element).on('change', function () {

                    var username_value = $('#search').val();
                    var repo_value     = $(this).val();

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
});
