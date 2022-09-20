'use strict';
console.log('Starting node-exec server...');
const utils = require('./controllers/utils');
const router = require('koa-router');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const compress = require('koa-compress');
const koa = require('koa');
var app = new koa();

app.use(logger());
var _ = new router();

_.get('/healthz', (ctx) => {
  ctx.body = 'OK';
});
_.post('/uglify', koaBody(), utils.uglify);
_.post('/browserify', koaBody(), utils.browserify);

app.use(_.routes())
app.use(compress());
app.listen(1337);
console.log('listening on port 1337');
