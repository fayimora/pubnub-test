var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var app = express();

var pubnub = require('pubnub') ({
  ssl: true,
  publish_key: "pub-c-079e0226-b648-462d-b68d-c7e97e68edfc",
  subscribe_key: "sub-c-f48572d2-f2a2-11e5-b552-02ee2ddab7fe"
});


app.use(logger('dev'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Pubnub shit
var message = {"hello": "world"};
setInterval(function () {
  pubnub.publish({
    channel: "hello",
    message: message,
    callback: function (res) {
      console.log("=========== SUCCESS ============");
      console.log(res);
    },
    error: function (e) {
      console.log("====== Oops! ");
      console.error(e);
    }
  });
}, 2000);

module.exports = app;
