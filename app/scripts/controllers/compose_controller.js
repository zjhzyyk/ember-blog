EmBlog.ComposeController = Em.ObjectController.extend({
	reset:function(){
		this.set("errorMessage", "");
	},
	actions: {
		submit: function(){
			var self = this;
			$.post("/compose", {
				title: self.get("model.title"),
				content: self.get("model.content"),
				createTime: self.get("model.createTime"),
				_csrf: self.session.get("csrf")
			}).then(function(response){
				self.set('errorMessage', response.message);
				if (response.success) {
					EmBlog.Blogs.reset();
					self.transitionToRoute('index');
				}
			});
		}
	}
});