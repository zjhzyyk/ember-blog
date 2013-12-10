EmBlog.LoginController = Em.Controller.extend({
	reset: function() {
    this.setProperties({
      username: "",
      password: "",
      errorMessage: ""
    });
  },

  // token: localStorage.token,
  // tokenChanged: function() {
  //   localStorage.token = this.get('token');
  // }.observes('token'),

  actions: {
    login: function() {
      var self = this, data = this.getProperties('username', 'password', 'rememberme');
      // Clear out any error messages.
      this.set('errorMessage', null);
      data.password = CryptoJS.PBKDF2(data.password, data.username, { keySize: 16, iterations: 100 }).toString();
      console.log(data.password);
      $.post('/auth', data).then(function(response) {
        self.set('errorMessage', response.message);
        if (response.success) {
          console.log('Login succeeded!');
          // self.set('token', response.token);
          self.session.set('loggedIn', true);
          self.session.set('username', data.username);
          var attemptedTransition = self.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set('attemptedTransition', null);
          } else {
            self.transitionToRoute('index');
          }
        }
        else {
          self.session.set('loggedIn', false);
        }
      }, function(){
        self.session.set('loggedIn', false);
      });
    }
  }

});