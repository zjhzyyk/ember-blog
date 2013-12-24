var EmBlog = window.EmBlog = Ember.Application.create({
	ready: function(){
		this.register('session:current', EmBlog.Session);
		this.register('config:current', EmBlog.Config);
		this.inject('controller', 'session', 'session:current');
		this.inject('controller', 'config', 'config:current');
	}
});

/* Order and include as you please. */
require('scripts/config');
require('scripts/session');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/pbkdf2');