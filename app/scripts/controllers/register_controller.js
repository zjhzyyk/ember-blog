EmTmp.RegisterController = Em.Controller.extend({
	reset: function() {
    this.setProperties({
      username: "",
      password: "",
      email: "",
      errorMessage: ""
    });
  },
  actions: {
  	register: function(){
  		var self = this, data = this.getProperties('username', 'password', 'email');
      // Clear out any error messages.
      this.set('errorMessage', null);
      data.password = CryptoJS.PBKDF2(data.password, data.username, { keySize: 16, iterations: 100 }).toString();
      $.post('/register', data).then(function() {
        self.transitionToRoute('/');
      });
  	}
  }
});