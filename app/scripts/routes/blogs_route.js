EmBlog.BlogsRoute = Em.Route.extend({
	model: function () {
		return EmBlog.Blogs.loadBlogs();
	}
});