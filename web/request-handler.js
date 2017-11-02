var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!





exports.handleRequest = function (req, res) {

  fs.readFile('/Users/student/code/hrsf85-web-historian/web/public/index.html', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

  //res.end(web.public.index.html)
};