EmBlog.ComposeRoute = Em.Route.extend({
	model: function(){
		return EmBlog.Blog.create({
			createTime: new Date(),
			title: "Title here",
			content: "<p>Content here</p>"
		});
	},
	setupController: function(controller, model){
		if (!controller.session.loggedIn)
			this.transitionTo("login");
		controller.set("model", model);
		controller.reset();
		if (controller.session.get("loggedIn") && !controller.session.get("csrf")) {
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
		}
	}
});