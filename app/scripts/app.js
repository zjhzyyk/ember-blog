var EmTmp = window.EmTmp = Ember.Application.create({
	ready: function(){
		this.register('session:current', EmTmp.Session);
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