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
Copyright (c) 2013, Sander Blue All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.