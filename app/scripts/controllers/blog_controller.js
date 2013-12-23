EmBlog.BlogController = Em.ObjectController.extend({
	inEditing: false,
	actions: {
		deletePost: function(){
			var self = this;
			$.ajax({
				url: '/blog/'+self.get("model.id"), 
				type: 'DELETE', 
				headers: {
					'X-CSRF-Token': self.session.get("csrf")
				}
			}).then(function(){
				EmBlog.Blogs.reset();
				self.transitionToRoute('blogs');
			});
		}
	}
});