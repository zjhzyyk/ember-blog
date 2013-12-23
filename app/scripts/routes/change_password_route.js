EmBlog.ChangePasswordRoute = Em.Route.extend({
	setupController: function(controller){
		if (!controller.session.loggedIn)
			this.transitionTo("login");
		controller.reset();
		if (controller.session.get("loggedIn") && !controller.session.get("csrf")) {
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
		}
	}
});