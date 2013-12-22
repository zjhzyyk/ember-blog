EmBlog.EditController = Em.ObjectController.extend({
	actions: {
		submit: function(){
			var self = this;
			$.ajax({
				url: '/blog/'+self.get("model.id"), 
				type: 'PUT',
				data: {
					title: self.get("model.title"),
					content: self.get("model.content")
				}
			}).then(function(response){
				if (response.success) {
					EmBlog.Blogs.blogs = null;
					self.transitionToRoute('blog', self.get('model'));
				}
			});
		}
	}
});