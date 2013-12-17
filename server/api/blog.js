var Blog = require("../model/blog");
var config = require("../config");

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
				Blog.count({}, function(err, count){
					var totalPages = count/config.blogsPerPage;
					if (totalPages*config.blogsPerPage<count) totalPages++;
					res.json(200, {data: blogs, total: totalPages});	
				});
			}
		});
}

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