EmBlog.ComposeRoute = Em.Route.extend({
	model: function(){
		return EmBlog.Blog.create({
			createTime: new Date(),
			title: "Title here",
			content: "<p>Content here</p>"
		});
	},
	setupController: function(controller, model){
		controller.set("model", model);
		controller.reset();
	}
});