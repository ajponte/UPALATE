'use strict';

//Setting up route
angular.module('available-foods').config(['$stateProvider',
	function($stateProvider) {
		// Available foods state routing
		$stateProvider.
		state('available-foods', {
			url: '/available-foods',
			templateUrl: 'modules/available-foods/views/available-foods.client.view.html',
			controller: 'AvailableFoodsController'
		});
	}
]);
