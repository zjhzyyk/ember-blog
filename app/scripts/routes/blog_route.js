EmTmp.BlogRoute = Em.Route.extend({
	model: function (param) {
		return EmTmp.Blogs.findBlogById(param.blog_id);
	}
});