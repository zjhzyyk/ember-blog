EmBlog.ArchivesController = Em.Controller.extend({
	pagMsg: function(){
		if (this.hasMore)
			return "Get more archives";
		else 
			return "No more archives";
	}.property('hasMore'),
	actions: {
		getMoreArchives: function(){
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