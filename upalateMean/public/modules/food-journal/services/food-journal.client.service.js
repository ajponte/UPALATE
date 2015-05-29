'use strict';

angular.module('food-journal').factory('FoodJournal', ['$http', '$q',
	function($http, $q) {
		
		/** Returns the food journal data for the user
		 *  whose ID is USERID. */
		function getFoodJournal(userId) {
			var deferred = $q.defer();
			$http.post('/api/users/getFoodJournal', {user:userId})
				.then(function(result) {
					deferred.resolve(result.data);
			});
			return deferred.promise;
		}
		// Public API
		return {
			getUserFoodJournal: getFoodJournal
			}
		
	}
]);