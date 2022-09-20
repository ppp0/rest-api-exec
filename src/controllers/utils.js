'use strict';
var UglifyJS = require("uglify-js");
var Browserify = require('browserify')
var fs=require('fs');

module.exports = {
  uglify: (ctx) => {
    ctx.body = UglifyJS.minify(ctx.request.body, {quote_keys: true}).code;
  },
  browserify: (ctx) => {
    var options = ctx.request.body;
    ctx.assert(options.mainPaths, 422, 'Property "mainPaths" must be defined');
    ctx.assert(Array.isArray(options.mainPaths), 422, 'Property "mainPaths" must be an array');
    var browserify = new Browserify('/opt/mount/library/CM/client-vendor/serviceworker/cm.js', {entries: options.sourcePaths});
    //
    // var result = browserify.bundle();
    const data = fs.readFileSync('/opt/mount/library/CM/client-vendor/serviceworker/cm.js', 'utf8');
    ctx.body = {
      status: 'success',
      json: data
    };
  }
}
