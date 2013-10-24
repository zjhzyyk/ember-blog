var EmTmp = window.EmTmp = Ember.Application.create();
EmTmp.ApplicationAdapter = DS.FixtureAdapter.extend();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
