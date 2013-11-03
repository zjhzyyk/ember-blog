EmTmp.IndexRoute = Em.Route.extend({
	redirect: function() {
		this.transitionTo("archives");
	}
});