'use strict';

//Setting up route
angular.module('my-profile').config(['$stateProvider',
	function($stateProvider) {
		// My profile state routing
		$stateProvider.
		state('my-profile', {
			url: '/myprofile',
			templateUrl: 'modules/my-profile/views/my-profile.client.view.html'
		});
	}
]);