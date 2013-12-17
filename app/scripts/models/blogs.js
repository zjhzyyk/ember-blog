var Promise = Em.RSVP.Promise;

EmBlog.Blogs = Em.Object.extend({});

EmBlog.Blogs.reopenClass({
	loadingBlogs: false,
	hasMore: true,
	loadBlogs: function() {
		var self = this;
		var prevYear = 1000000;
		return new Promise(function(resolve, reject){
			if (self._blogs) {
				resolve(self._blogs);
			} else {
				resolve($.getJSON("/getblogs?page=1").then(function(res){
					var blogs = Em.A();
					res.data.forEach(function (item){
						item.id = item._id;
						item.createTime = new Date(item.createTime);
						var blog = EmBlog.Blog.create(item);
						if (blog.get('year')<prevYear) blog.set('showYear', true);
						else blog.set('showYear', false);
						prevYear = blog.get('year');
						blogs.pushObject(blog);
					});
					self.totalPages = res.total;
					self.prevYear = prevYear;
					self.page = 1;
					if (self.page>=self.totalPages)
						self.hasMore = false;
					self._blogs = blogs;
					return blogs;
				}));
			}
		});
	},
	loadMoreBlogs: function(){
		var self = this;
		var prevYear = self.prevYear;
		return new Promise(function(resolve, reject){
			if (self.loadingBlogs && !hasMore)
				reject();
			else {
				self.loadingBlogs = true;
				resolve($.getJSON("/getblogs?page="+(self.page+1)).then(function(res){
					res.data.forEach(function(item){
						item.id = item._id;
						item.createTime = new Date(item.createTime);
						var blog = EmBlog.Blog.create(item);
						if (blog.get('year')<prevYear) blog.set('showYear', true);
						else blog.set('showYear', false);
						prevYear = blog.get('year');
						self._blogs.pushObject(blog);
					});
					self.page++;
					if (self.page>=self.totalPages)
						self.hasMore = false;
					return {
						blogs: self._blogs,
						hasMore: self.hasMore
					};
				}));
			}
		});
	},
	findBlogById: function(id) {
		var self = this;
		return new Promise(function(resolve){
			resolve(self.loadBlogs().then(function(blogs){
				return blogs.findBy('id', id);
			}));
		});
	}
});
