EmBlog.BlogsController = Em.Controller.extend({
	pagMsg: function(){
		if (this.hasMore)
			return "Get more blogs";
		else 
			return "No more blogs";
	}.property('hasMore'),
	actions: {
		getMoreBlogs: function(){
			var self = this;
			if (self.hasMore) {
				EmBlog.Blogs.loadMoreBlogs().then(function(res){
					self.set("model", res.blogs);
					self.set("hasMore", res.hasMore);
				});
			}
		}
	}
});