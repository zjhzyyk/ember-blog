

var Promise = Em.RSVP.Promise;
var baseURL = location.protocol+"//"+location.hostname;
if (location.port!="") baseURL+=(":"+location.port);

EmTmp.Blogs = Em.Object.extend({});

EmTmp.Blogs.reopenClass({
	loadBlogs: function() {
		var self = this;
		var prevYear = 1000000;
		return new Promise(function(resolve, reject){
			if (self._blogs) {
				resolve(self._blogs);
			} else {
				resolve($.getJSON(baseURL+"/getblogs?page=1").then(function(res){
					var blogs = Em.A();
					res.data.forEach(function (item){
						item.id = item._id;
						item.createTime = new Date(item.createTime);
						var blog = EmTmp.Blog.create(item);
						if (blog.get('year')<prevYear) blog.set('showYear', true);
						else blog.set('showYear', false);
						prevYear = blog.get('year');
						blogs.pushObject(blog);
					});
					self._blogs = blogs;
					return blogs;
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
