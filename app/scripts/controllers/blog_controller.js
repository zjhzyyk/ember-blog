EmBlog.BlogController = Em.ObjectController.extend({
	inEditing: false,
	actions: {
		deletePost: function(){
			var self = this;
			$.ajax({url: '/blog/'+self.get("model.id"), type: 'DELETE'}).then(function(){
				EmBlog.Blogs.blogs = null;
				self.transitionToRoute('blogs');
			});
		}
	}
});