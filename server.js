'use strict';

var express = require('express');

var app = express();

// Bind base URL to a notification that the microservice needs to have a parameter.
app.get("/", function(req, res) {
  // convert IP to IPv4
  var ip = req.ip;
  if (ip.lastIndexOf(':') >= 0) {
    ip = ip.slice(ip.lastIndexOf(':') + 1);
  }
  
  // extract software from user agent
  var userAgent = req.get('User-Agent');
  var from = userAgent.indexOf('(')+1;
  var to = userAgent.indexOf(')');
  var sw = (from < to && from > 0 && to > 0) ? userAgent.substring(from, to): "";

  // get language
  var lang = req.get('Accept-Language');

  res.json({ "ipaddress" : ip, "language" : lang, "software" : sw });
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

