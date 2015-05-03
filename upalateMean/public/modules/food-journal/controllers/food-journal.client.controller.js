/** Controller for food journal view.
 *  @author Alan Ponte
 */

'use strict';

angular.module('food-journal').controller('FoodJournalController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		$scope.entries = [];
		$scope.fdaGuides = [];
		$scope.Authentication = Authentication;
		
		/** Returns the users food journal entries.  This will 
		 *  initally be the information the user entered
		 *  upon registration. */
		$scope.getEntries = function() {
			$http.post	('/api/users/getSurveyData', {user:$scope.Authentication.user._id})
				.success(function(data) {
					$scope.entries = data;
				});
		};

		$scope.cleanString = function(str) {
			return str.replace(/[-]/g, " ");
		};

		/** Returns the FDA recommendations from Mongo. */
		$scope.getFdaGuide = function() {
			$http.get('/api/foodData/fdaGuides')
				.success(function(data) {
					$scope.fdaGuides = data;
				});
		};

		$scope.gridOptions = {
			data: 'fdaGuides',
			columnDefs: [
				{field: "foodComponent",
				displayName: "Food Component"},
				{field: "dv",
				displayName: "% Daily Value"},
			]
		};
	}
]);