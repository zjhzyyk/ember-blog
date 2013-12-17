EmBlog.BlogsRoute = Em.Route.extend({
	model: function () {
		return EmBlog.Blogs.loadBlogs();
	},
	setupController: function(controller, model){
		controller.set("model", model);
		controller.set("hasMore", EmBlog.Blogs.hasMore);
	}
});