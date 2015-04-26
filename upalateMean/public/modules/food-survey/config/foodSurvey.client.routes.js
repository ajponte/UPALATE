'use strict';

/** Routes for foodSurvey module. 
 *  @author Alan Ponte
 */
angular.module('food-survey').config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('foodSurvey', {
			url: '/foodSurvey',
			templateUrl:'modules/food-survey/views/foodSurvey.client.view.html',
			controller:'foodSurveyController'
		});
	}
])