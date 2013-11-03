EmTmp.BlogsRoute = Em.Route.extend({
	model: function () {
		return EmTmp.Blogs.loadBlogs();
	}
});