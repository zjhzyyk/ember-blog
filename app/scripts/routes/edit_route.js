EmBlog.EditRoute = Em.Route.extend({
	model: function(param){
		return EmBlog.Blogs.findBlogById(param.blog_id);
	},
	setupController: function(controller, model){
		if (!controller.session.loggedIn)
			this.transitionTo("login");
		controller.set("model", model);
	}
})