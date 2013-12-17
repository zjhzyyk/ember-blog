EmBlog.ApplicationController = Em.Controller.extend({
	actions: {
		logout: function(){
			var self = this;
			$.post('/logout').then(function(data, textStatus, xhr){
				if (xhr.status==200) {
					self.session.set("loggedIn", false);
					self.session.set("username", "");
				}
				else
					console.log("fails to logout");
			});
		}
	}
});