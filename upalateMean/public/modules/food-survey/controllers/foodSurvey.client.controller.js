'use strict'


/** Angular controller for the food survey.
 *  @author Alan Ponte
 */
angular.module('food-survey').controller('foodSurveyController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.Authentication = Authentication;
		/** Returns today current date. */
		$scope.currentDate = (function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			today = mm + '/' + dd + '/' + yyyy;
			return today;
		})();
	}
]);