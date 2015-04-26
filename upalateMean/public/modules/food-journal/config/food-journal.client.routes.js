'use strict';

//Setting up route
angular.module('food-journal').config(['$stateProvider',
	function($stateProvider) {
		// Food journal state routing
		$stateProvider.
		state('food-journal', {
			url: '/food-journal',
			templateUrl: 'modules/food-journal/views/food-journal.client.view.html'
		});
	}
]);