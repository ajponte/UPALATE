'use strict'


/** Angular controller for the food survey.
 *  @author Alan Ponte
 */
angular.module('food-survey').controller('foodSurveyController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {

		$scope.dates = {};

		$scope.Authentication = Authentication;
		/** Returns today current date. */
		$scope.dates.currentDate = (function() {
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

		/** Returns yesterdays date. */
		$scope.dates.yesterday = (function() {
			var today = new Date();
			var day = (today.getDay() - 2) % 7;
			var dd = today.getDate() - 1;
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			today = mm + '/' + dd + '/' + yyyy;
			return getDayString(day) + ' ' + today;
		})();

		/** Returns the day before yesterday's date. */
		$scope.dates.dayBeforeYesterday = (function() {
			var today = new Date();
			var day = (today.getDay() - 3) % 7;
			var dd = today.getDate() - 2;
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			today = mm + '/' + dd + '/' + yyyy;
			return getDayString(day) + ' ' + today;
		})();

		/** Returns a String of the date two days 
		 *  ago from today. */
		$scope.dates.twoDaysAgo = (function() {
			var today = new Date();
			var day = (today.getDay() - 4) % 7;
			var dd = today.getDate() - 2;
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			today = mm + '/' + dd + '/' + yyyy;
			return getDayString(day) + ' ' + today;
		})();

		/** Returns the String representation of 
		 *  the day DD. */
		 function getDayString(dd) {
			var weekday = new Array(7);
			weekday[0]="Monday";
			weekday[1]="Tuesday";
			weekday[2]="Wednesday";
			weekday[3]="Thursday";
			weekday[4]="Friday";
			weekday[5]="Saturday";
			weekday[6]="Sunday";
			return weekday[dd];
		};

		/** Submits the survey to Mongo. */
		$scope.submitSurvey = function() {
			var survey = {
				yesterday: {
					breakfast: $scope.yesterdayBreakfast,
					lunch: $scope.yesterdayLunch,
					dinner: $scope.dinnerYesterday
				}
			};

			$http.post('/api/users/submitSurvey', survey)
				.success(function(data) {
					console.log("data from post: " + JSON.stringify(data));
				});
		};

	}
]);

