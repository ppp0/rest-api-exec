'use strict';
const UglifyJS = require("uglify-js");
const Browserify = require('browserify');
const Postcss = require('postcss');
const PostcssScss = require('postcss-scss');
const Autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');


module.exports = {
  uglify: (ctx) => {
    ctx.body = UglifyJS.minify(ctx.request.body, {compress: false, output: {quote_keys: true, beautify: false}}).code;
  },

  browserify: (ctx) => {
    var options = ctx.request.body;
    ctx.assert(options.mainPaths, 422, 'Property "mainPaths" must be defined');
    ctx.assert(Array.isArray(options.mainPaths), 422, 'Property "mainPaths" must be an array');
    const browserify = new Browserify(options.mainPaths, {paths: options.sourcePaths});
    ctx.body = browserify.bundle();
  },

  autoprefixer: (ctx) => {
    Postcss([Autoprefixer])
      .process(ctx.request.body, {from: null, syntax: PostcssScss, parser: PostcssScss})
      .then(result => {
        result.warnings().forEach(warn => {
          process.stderr.write(warn.toString())
        })
        ctx.body = result.css;
      })
      .catch(error => {
        ctx.response.status = 422;
        process.stderr.write(error.message + error.showSourceCode() + "\n");
      })
  }
}
