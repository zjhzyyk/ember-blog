EmBlog.BlogRoute = Em.Route.extend({
	model: function (param) {
		return EmBlog.Blogs.findBlogById(param.blog_id);
	},
	setupController: function(controller, model) {
		controller.set("model", model);
		if (controller.session.get("loggedIn") && !controller.session.get("csrf")) {
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
		}
	}
});