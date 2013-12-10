EmBlog.BlogRoute = Em.Route.extend({
	model: function (param) {
		return EmBlog.Blogs.findBlogById(param.blog_id);
	}
});