'use strict';
console.log('Starting node-exec server...');
const process = require('./controllers/process');
const router = require('koa-router');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const compress = require('koa-compress');
const koa = require('koa');
const app = new koa();
var port = 1337;

app.use(logger());
app.use(koaBody({formLimit: '5mb', textLimit: '5mb'}));

var route = new router();
route.get('/healthz', (ctx) => {
  ctx.body = 'OK';
});
route.post('/uglify', process.uglify);
route.post('/browserify', process.browserify);
route.post('/autoprefixer', process.autoprefixer);

app.use(route.routes());
app.listen(port);
console.log('listening on port ' + port);
