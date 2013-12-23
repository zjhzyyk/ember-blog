EmBlog.RegisterRoute = Em.Route.extend({
	setupController: function(controller){
		controller.reset();
		if (!controller.session.get("csrf"))
			$.getJSON('/csrf').then(function(res){
				controller.session.set("csrf", res.csrf);
			});
	}
});