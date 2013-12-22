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
				createTime: self.get("model.createTime")
			}).then(function(response){
				self.set('errorMessage', response.message);
				if (response.success) {
					EmBlog.Blogs.blogs = null;
					self.transitionToRoute('index');
				}
			});
		}
	}
});