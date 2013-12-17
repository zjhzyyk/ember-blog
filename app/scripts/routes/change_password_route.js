EmBlog.ChangePasswordRoute = Em.Route.extend({
	setupController: function(controller){
		if (!controller.session.loggedIn)
			this.transitionTo("login");
		controller.reset();
	}
});