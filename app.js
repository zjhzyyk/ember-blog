var express = require("express");
var blog = require("./server/api/blog");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");
var app = express();

// app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next) {
	var result = req.url.match(/\/(bower_components|styles|scripts)/);
	if (result) {
		req.url = req.url.slice(result.index);
	} else if (/^\/(blogs|archives|login|(blog\/([0-9a-zA-Z]+)))/.test(req.url)) {
		req.url = "/";
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

// var sendIndex = function(req,res) {
// 	res.sendfile(__dirname+'/app/index.html');
// };

// app.get('/blogs', sendIndex);
// app.get('/archives', sendIndex);
// app.get('/login', sendIndex);
// app.get(/^\/blog\/([0-9a-zA-Z]+)$/, sendIndex);


app.get('/getblogs', blog.getBlogs);
// app.get('/summaries', blog.getSummary);
// app.del('/api/authors/:id', api_authors.remove);
// app.post('/api/authors', api_authors.create);

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Http server listening on port 3000");