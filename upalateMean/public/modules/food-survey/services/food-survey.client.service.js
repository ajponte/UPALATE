'use strict';

angular.module('food-survey').factory('FoodSurvey', ['$http', '$q',
	function($http, $q) {

		function getAvailableFoods() {
			var deferred = $q.defer();
			$http.post('/api/foodData/availableFoods',{})
				.then(function(result) {
					deferred.resolve(result.data);
			});
			return deferred.promise;
		}

		// Public API
		return {
			get: getAvailableFoods
		};
	}
]);

