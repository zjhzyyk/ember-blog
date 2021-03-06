EmBlog.ChangePasswordController = Em.Controller.extend({
	reset:function(){
		this.setProperties({
			oldPassword: "",
			newPassword: "",
			errorMessage: ""
		});
	},
	actions: {
		changePassword: function(){
			var self = this, data = this.getProperties('oldPassword', 'newPassword');
			data._csrf = self.session.get("csrf");
			this.set('errorMessage', null);
			data.oldPassword = CryptoJS.PBKDF2(data.oldPassword, self.session.get("username"), {
					keySize: self.config.get('pbkdf2_keysize'), 
					iterations: self.config.get('pbkdf2_iterations') 
				}).toString();
			data.newPassword = CryptoJS.PBKDF2(data.newPassword, self.session.get("username"), {
					keySize: self.config.get('pbkdf2_keysize'), 
					iterations: self.config.get('pbkdf2_iterations') 
				}).toString();
			$.post('/change-password', data).then(function(response){
				self.set('errorMessage', response.message);
				if (response.success) {
					self.transitionToRoute('index');
				}
			});
		}
	}
});