/** Service for connect to Node REST 
 *  calls to get food survey data.
 *  @author Alan Ponte
 */

'use strict';

angular.module('food-survey').factory('FoodSurvey', ['$http', '$q',
	function($http, $q) {


		/** Returns the food data which was entered by the 
		 *  user indicated by USERID upon registration. */
		function getSurveyData(userId) {
			var deferred = $q.defer();
			$http.post('/api/users/getSurveyData', {user:userId})
				.then(function(result) {
					deferred.resolve(result.data);
			});
			return deferred.promise;
		}

		// Public API
		return {
			getUserSurveyData: getSurveyData
		};
	}
]);

