/** Available Foods Service.
 *  @author Alan Ponte
 */

'use strict';

angular.module('available-foods').factory('Availablefoods', ['$http', '$q',
	function($http, $q) {

		function getAvailableFoods() {
			var deferred = $q.defer();
			$http.post('/api/foodData/availableFoods',{})
				.then(function(result) {
					deferred.resolve(result.data);
			});
			return deferred.promise;
		}

		/** Returns all available foods which match the QUERY. */
		function getAvailableFoodByQuery(query) {
			var deferred = $q.defer();
			$http.post('/api/foodData/availableFoods/filter', query)
				.then(function(result) {
					deferred.resolve(result.data);
			});
			return deferred.promise;
		} 
		return {
			get: getAvailableFoods,
			getAvailableFoodsQuery: getAvailableFoodByQuery
		};
	}
]);