EmTmp.Router.map(function () {
	this.resource("archives");
	this.resource("blogs");
	this.resource("blog", {path: '/blog/:blog_id'}, function(){
		this.route("edit");
	});
	this.route('login');
	this.route('register');
	this.route('logout');
});

EmTmp.Router.reopen({
	location: 'history'
});
