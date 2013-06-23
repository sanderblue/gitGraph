GitGraph
========
This is a small jQuery plugin I built with JavaScript, jQuery, [Morris.js](http://oesmith.github.com/morris.js/), [Moment.js](http://momentjs.com/) and GitHub's Developer API. It uses GitHub's API to update a Morris.js line chart with a specified repo's commits over the last 7 days. GitHub's individual repo line charts only show a static week (Sunday to Saturday), but gitGraph displays data based on the current day of the week.

Status: Working.


Dependencies
============
[jQuery](http://jquery.com/),
[Raphael.js](http://raphaeljs.com/),
[Morris.js](http://oesmith.github.com/morris.js/),
[Moment.js](http://momentjs.com/)


Usage
=====
First choose the user for which you would like to see repo activity. Then choose a repo of that user to display their recent activity. You will pass in the username and repo as options of the plugin. You must also specify a height for your html element. The below example has inline style for demonstration purposes.

Update: You can now give your div any id you wish as long as you pass it in as an option, ``` { html: "someID" } ```


Include dependencies and GitGraph.js
``` html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="raphael.min.js"></script>
<script type="text/javascript" src="morris.min.js"></script>
<script type="text/javascript" src="moment.min.js"></script>
<script type="text/javascript" src="gitGraph.js"></script>
```


Write your markup including the div's ID as "someID"
``` html
<div id="someID" style="height: 300px; width:660px;"></div>
```


Initialize the plugin with the following parameters: GitHub username, and a repository from that user
``` javascript
$('#someID').gitGraph({
  html: "someID", // you can now pass in any div ID as an option
  user: "github", // any GitHub username
  repo: "github-services" // any public repository of the specified username's account
});
```


Also note this from GitHub's API v3 Documentation:
"Rate Limiting:
We [GitHub] limit requests to 60 per hour for unauthenticated requests. For requests using Basic Authentication or OAuth, we limit requests to 5,000 per hour."


On the agenda:
==============
Demo site, more options, larger data sets, better error handling, better test-driven development.
You can see the plugin in action here at [SanderBlue.com](http://www.sanderblue.com/) in the work section.


License
=======
Copyright (c) 2013 Sander Blue <william.blue@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.