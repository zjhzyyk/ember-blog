var Promise = Em.RSVP.Promise;
EmTmp.User = Em.Object.extend({});
EmTmp.User.reopenClass({
	loadUser: function () {
		return new Promise(function(resolve,reject){
			resolve($.getJSON("/getUser").then(function(res){
				return res;
			}));
		});
	}
})