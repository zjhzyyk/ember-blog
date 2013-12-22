var express = require("express");
var blog = require("./server/api/blog");
var user = require("./server/api/user");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");
var app = express();

app.configure(function(){
  // app.use(express.favicon());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
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
  app.use(app.router);
  app.use(express.logger('dev'));
  app.use(express['static'](__dirname + '/app'));
  app.use(express['static'](__dirname + '/.tmp'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
});

app.get('/getblogs', blog.getBlogs);
app.delete('/blog/:id', blog.delete);
app.put('/blog/:id', blog.modify);
app.get('/getUser', user.getUser);
app.post('/auth', user.login);
app.post('/register', user.register);
app.post('/logout', user.logout);
app.post('/change-password', user.changePassword);
app.post('/compose', blog.create);

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Http server listening on port 3000");