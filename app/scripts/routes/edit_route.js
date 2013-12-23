EmBlog.EditRoute = Em.Route.extend({
	model: function(param){
		return EmBlog.Blogs.findBlogById(param.blog_id);
	},
	setupController: function(controller, model){
		if (!controller.session.loggedIn)
			this.transitionTo("login");
		controller.set("model", model);
		if (controller.session.get("loggedIn") && !controller.session.get("csrf")) {
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
		}
	}
})