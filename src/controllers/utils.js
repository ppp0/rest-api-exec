'use strict';
var UglifyJS = require("uglify-js");
var Browserify = require('browserify')
var fs = require('fs');

module.exports = {
  uglify: (ctx) => {
    ctx.body = UglifyJS.minify(ctx.request.body, {quote_keys: true}).code;
  },
  browserify: (ctx) => {
    var options = ctx.request.body;
    ctx.assert(options.mainPaths, 422, 'Property "mainPaths" must be defined');
    ctx.assert(Array.isArray(options.mainPaths), 422, 'Property "mainPaths" must be an array');
    options.mainPaths.forEach((val) => ctx.assert(fs.stat(val, (err, stats) => stats.isFile()), 422, 'File ' + val + ' not found'));
    var browserify = new Browserify(options.mainPaths, {paths: options.sourcePaths});
    ctx.body = browserify.bundle();
  }
}
