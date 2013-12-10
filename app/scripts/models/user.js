var Promise = Em.RSVP.Promise;
EmBlog.User = Em.Object.extend({});
EmBlog.User.reopenClass({
	loadUser: function () {
		return new Promise(function(resolve,reject){
			resolve($.getJSON("/getUser").then(function(res){
				return res;
			}));
		});
	}
})