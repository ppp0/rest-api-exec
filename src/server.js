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
app.use(koaBody({formLimit: '5mb', textLimit: '5mb'}));
var _ = new router();

_.get('/healthz', (ctx) => {
  ctx.body = 'OK';
});
_.post('/uglify', utils.uglify);
_.post('/browserify', utils.browserify);

app.use(_.routes())
app.use(compress());
app.listen(1337);
console.log('listening on port 1337');
