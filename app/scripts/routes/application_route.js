EmBlog.ApplicationRoute = Em.Route.extend({
	model: function () {
		return EmBlog.User.loadUser();
	},
	setupController: function (controller, model) {
		if (model.username) {
			controller.session.loggedIn = true;
			controller.session.username = model.username;
		}
		else {
			controller.session.loggedIn = false;
			controller.session.username = "";	
		}
		if (controller.session.get("loggedIn") && !controller.session.get("csrf")) {
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
		}
	}
});