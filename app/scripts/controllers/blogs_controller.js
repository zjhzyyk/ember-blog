EmBlog.BlogsController = Em.ObjectController.extend({
	actions: {
		getMoreBlogs: function(){
			var self = this;
			EmBlog.Blogs.loadMoreBlogs().then(function(res){
				self.set("model", res.blogs);
				self.set("hasMore", res.hasMore);
			});
		}
	}
});