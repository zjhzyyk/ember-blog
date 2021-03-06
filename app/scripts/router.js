EmBlog.Router.map(function () {
	this.resource("archives");
	this.resource("blogs");
	this.resource("blog", {path: '/blog/:blog_id'});
	this.route('edit', {path: '/edit/:blog_id'});
	this.route('login');
	this.route('register');
	this.route('compose');
	this.route('changePassword', {path: '/change-password'});
});

EmBlog.Router.reopen({
	location: 'history'
});
