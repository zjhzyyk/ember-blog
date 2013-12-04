EmTmp.ApplicationRoute = Em.Route.extend({
	model: function () {
		return EmTmp.User.loadUser();
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
	}
});