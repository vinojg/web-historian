var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  //list: path.join(__dirname, '../web/public/index.html'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean! 

exports.readListOfUrls = function(callback) {
  
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.toString().split('\n'));
    } 
    
  });
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls(function(err, urls) {
    var found = false;
    if (err) {
      callback(err, null);
    }
    for (let i = 0; i < urls.length; i++) {
      if (urls[i] === url) {
        found = true;
      }
    }
    callback(null, found);
  });  
  
};

exports.addUrlToList = function(url, callback) {


  fs.appendFile(exports.paths.list, url, function(err) {
    if (err) {
      throw err;
    }
    callback();
  });
  
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, (exists) => {
    if (exists) {
      //console.log('file Exists');
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
  
};

exports.downloadUrls = function(urls) {
  // exports.paths.archivedSites
  // Get all links from sites.txt, create file in sites folder
  // urls = list array
  
  urls.forEach((url) => {
    fs.writeFile(exports.paths.archivedSites + '/' + url, '', (err) => {
      if (err) {
        throw err;
      }
    });
  });
};


