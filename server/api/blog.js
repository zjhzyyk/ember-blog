var Blog = require("../model/blog");
var config = require("../config");

// module.exports.getAll = function (req, res) {
// 	// console.log("in getAll function");
// 	Blog.find({}, function(err, blogs){
// 		if (err) {
// 			res.json(500,{
// 				error: err
// 			});
// 			console.log('Failed to get blogs, ' + err);
// 		} else {
// 			res.json(200, {data: blogs});
// 			console.log('Found blogs ' + JSON.stringify(blogs));
// 		}
// 	});
// };

module.exports.getBlogs = function(req, res) {
	if (!req.query.page || typeof parseInt(req.query.page)!=="number") {
		res.send(404);
		return;
	}
	var pageid = parseInt(req.query.page) - 1;
	if (pageid<0) {
		res.send(404);
		return;
	}
	var perpage = config.blogsPerPage;
	Blog.find({})
		.sort('-createTime')
		.skip(pageid*perpage)
		.limit(perpage)
		.exec(function(err, blogs){
			if (err) {
				res.json(500, {
					error: err
				});
			} else {
				res.json(200, {data: blogs});

			}
		});
}

// module.exports.getSummary = function(req, res) {
// 	// console.log(JSON.stringify(req.query));
// 	if (JSON.stringify(req.query)=="{}") {
// 		// console.log("get all titles");
// 		Blog.find({}, 'title createTime', function(err, titles){
// 			if (err) {
// 				res.json(500,{
// 					error: err
// 				});
// 			} else {
// 				res.json(200, {data: titles});
// 			}
// 		});
// 		return;
// 	}
// 	if (!req.query.pageNumber || typeof parseInt(req.query.pageNumber)!=="number") {
// 		res.send(404);
// 		return;
// 	}
// 	var pageid = parseInt(req.query.pageNumber) - 1;
// 	if (pageid<0) {
// 		res.send(404);
// 		return;
// 	}
// 	var perpage = config.summariesPerPage;
// 	Blog.find({}, 'title createTime')
// 		.sort('-createTime')
// 		.skip(pageid*perpage)
// 		.limit(perpage)
// 		.exec(function(err, titles){
// 			if (err) {
// 				res.json(500, {
// 					error: err
// 				});
// 				console.log('Failed to get titles, ' + err);
// 			} else {
// 				res.json(200, {data: titles});

// 			}
// 		});
// };

module.exports.create = function(req, res) {
	var blog = new Blog({
		name: req.body.name
	});
	blog.save(function (err) {
		if (err) {
			res.json(500,{
				error: err
			});
			console.log('Failed to create blog ' + JSON.stringify(req.body) + ', ' + err);
		} else {
			res.json(200,{
				id : blog.id
			});
			console.log('Created blog ' + JSON.stringify(req.body));
		}
	});
};