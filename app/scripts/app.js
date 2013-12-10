var EmBlog = window.EmBlog = Ember.Application.create({
	ready: function(){
		this.register('session:current', EmBlog.Session);
    this.inject('controller', 'session', 'session:current');
	}
});

/* Order and include as you please. */
require('scripts/session');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');