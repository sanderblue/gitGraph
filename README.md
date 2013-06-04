gitGraph
========
This is a small project I built with JavaScript, jQuery, [Morris.js](http://oesmith.github.com/morris.js/), [Moment.js](http://momentjs.com/) and GitHub's Developer API. It uses GitHub's API to update a Morris.js line chart with a specified repo's commits over the last 7 days.

Check out the [GitHub Developer API Documentation](http://developer.github.com/) for help creating your own line charts.

Status: Working, but also a work in progress.

Dependencies
============
[jQuery](http://jquery.com/),
[Raphael.js](http://raphaeljs.com/),
[Morris.js](http://oesmith.github.com/morris.js/)
[Moment.js](http://momentjs.com/)

Usage
=====
Simply set the variables (they will be obvious) in the js/app.js file to a desired username and repo.

Also note this from GitHub's API v3 Documentation:
"Rate Limiting

We limit requests to 60 per hour for unauthenticated requests. For requests using Basic Authentication or OAuth, we limit requests to 5,000 per hour."


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