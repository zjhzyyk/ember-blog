EmBlog.Router.map(function () {
	this.resource("archives");
	this.resource("blogs");
	this.resource("blog", {path: '/blog/:blog_id'}, function(){
		this.route("edit");
	});
	this.route('login');
	this.route('register');
	this.route('logout');
});

EmBlog.Router.reopen({
	location: 'history'
});
