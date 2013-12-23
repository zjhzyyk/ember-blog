var express = require("express");
var blog = require("./server/api/blog");
var user = require("./server/api/user");
var mongoose = require("mongoose");
var helmet = require('helmet');

mongoose.connect("mongodb://localhost/test");
var app = express();

app.configure(function(){
  app.use(express.favicon());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.use(helmet.cacheControl());
  app.use(express.cookieParser('7QCgCE4zokrn0&@zsn8MglH!ZbLTpM8C%QEMJtA@1lWhS3VTQl'));
  app.use(express.session({ 
    secret: 'xIAD1HVIrQ6!vTQKya!a1$3X8YGDm9buIdWci&CB7Ew6kFO16K',
    cookie: {httpOnly: true}
  }));
  app.use(function(req, res, next) {
    if (req.method == "GET") {
      //url rewrite
      var result = req.url.match(/\/(bower_components|styles|scripts)/);
      if (result) {
        req.url = req.url.slice(result.index);
      } else if (/^\/(blogs|archives|login|register|compose|change\-password|(edit\/([0-9a-zA-Z]+))|(blog\/([0-9a-zA-Z]+)))/.test(req.url)) {
        req.url = "/";
      }
    }
    next();
  });
  app.use(express.csrf());
  app.use(app.router);
  app.use(express.logger('dev'));
  app.use(express['static'](__dirname + '/app'));
  app.use(express['static'](__dirname + '/.tmp'));
  app.disable('x-powered-by')
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
});

app.get('/getblogs', blog.getBlogs);
app.delete('/blog/:id', blog.delete);
app.put('/blog/:id', blog.modify);
app.get('/getUser', user.getUser);
app.get('/csrf', function(req, res){
  res.json(200, {csrf: req.csrfToken()});
});
app.post('/auth', user.login);
app.post('/register', user.register);
app.post('/logout', user.logout);
app.post('/change-password', user.changePassword);
app.post('/compose', blog.create);

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Http server listening on port 3000");