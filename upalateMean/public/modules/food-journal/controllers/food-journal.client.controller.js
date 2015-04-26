'use strict';

angular.module('food-journal').controller('FoodJournalController', ['$scope', '$http',
	function($scope, $http) {
		$scope.entries = [];
		$scope.getEntries = function() {
			$http.get('/api/users/getSurveyData')
				.success(function(data) {
					console.log("got survey data: " + JSON.stringify(data));
					$scope.entries = data;
				});
		};

		$scope.cleanString = function(str) {
			return str.replace(/[-]/g, " ");
		};

		$scope.getFdaGuides = function() {
			$http.get('/api/foodData/fdaGuides')
				.success(function(data) {
					$scope.fdaGuides = data;
				});
		};


	}
]);