var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET' && req.url === '/') {
    
    fs.readFile('/Users/student/code/hrsf85-web-historian/web/public/index.html', 'utf8', (err, data) => {
      if (err) {
        throw err;
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
    
  } else if (req.method === 'GET') {
    
    archive.isUrlArchived(req.url, 
      function(err, isArchived) {
      
        if (isArchived === true) {

          fs.readFile('/Users/student/code/hrsf85-web-historian/test/testdata/sites' + req.url, 'utf8', (err, data) => {
            if (err) {
              throw err;
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
          
        } else {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end();
        }
        
      }
    );
    
  } else if (req.method === 'POST') {
    console.log('POSTING');
    let body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    
    req.on('end', () => {
      body = Buffer.concat(body).toString();
      body = body.slice(4);
      
      fs.readFile('/Users/student/code/hrsf85-web-historian/web/public/loading.html', 'utf8', (err, data) => {
        if (err) {
          throw err;
        } 
        res.writeHead(302, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
      
      archive.isUrlInList(body, 
        function(err, found) {
          if (found === true) {
            console.log('URL' + body + 'already in list!');
          } else {
            archive.addUrlToList(body + '\n', function() {});
            console.log('Added ' + body + ' to list!');
          }
        });
     
      

      
      
      // res.writeHead(302, {'Content-Type': 'text/html'});
      // res.end();
    });
    
  } else {

    
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end();
  }

};

// module.exports = {
//   handleRequest: handleRequest
// }

