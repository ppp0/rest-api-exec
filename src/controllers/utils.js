'use strict';
const UglifyJS = require("uglify-js");
const Browserify = require('browserify')
const fs = require('fs');
const path = require('path');


module.exports = {
  uglify: (ctx) => {
    ctx.body = UglifyJS.minify(ctx.request.body, {output: {quote_keys: true, beautify: false}}).code;
  },
  browserify: (ctx) => {
    var options = ctx.request.body;
    ctx.assert(options.mainPaths, 422, 'Property "mainPaths" must be defined');
    ctx.assert(Array.isArray(options.mainPaths), 422, 'Property "mainPaths" must be an array');
    // options.mainPaths.forEach(val => {
    //   ctx.assert(path.existSync(val), 422, val + ' not found');
    // });
    var browserify = new Browserify(options.mainPaths, {paths: options.sourcePaths});
    ctx.body = browserify.bundle();
  }
}
