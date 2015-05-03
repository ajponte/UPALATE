'use strict'


/** Angular controller for the food survey.
 *  @author Alan Ponte
 */
angular.module('food-survey').controller('foodSurveyController', ['$scope', '$http', '$resource','$window', '$location', 'Authentication', 'FoodSurvey', 'Availablefoods',
	function($scope, $http, $resource, $window, $location, Authentication, FoodSurvey, Availablefoods) {
	var tags = $resource('foodNames.json');

	/*$scope.getAvailableFoods = Availablefoods.get().then(function(data) {
		console.log('foods from promise: ' + JSON.stringify(data));
	});*/

	$scope.loadTags = function(query) {
	    return tags.query().$promise;
	};

		/*$http.post('/api/foodData/availableFoods',{})
			.success(function(data) {
				$scope.availableFoods = data;
				//console.log("food: " + JSON.stringify(data));
		});*/

		$scope.Authentication = Authentication;


		/** Returns yesterdays date. */
		$scope.yesterday = (function() {
			var today = new Date();
			today.setDate(today.getDate() - 1);
			var day = today.getDay();
			console.log("yesterday: " + day);
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
			return getDayString(day, "yesterday") + ' ' + today;
		})();

		/** Returns the day before yesterday's date. */
		$scope.dayBeforeYesterday = (function() {
			var today = new Date();
			today.setDate(today.getDate() - 2);
			var day = today.getDay();
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
			return getDayString(day, "dayBefore") + ' ' + today;
		})();

		/** Returns a String of the date two days 
		 *  ago from today. */
		$scope.twoDaysAgo = (function() {
			var today = new Date();
			today.setDate(today.getDate() - 3)
			var day = today.getDay();
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
			return getDayString(day, "twoDaysBefore") + ' ' + today;
		})();

		/** Returns the String representation of 
		 *  the day DD. */
		 function getDayString(dd, whichDay) {
		 	console.log("dd: " + dd);
			var weekday = new Array(7);
			weekday[0]="Monday";
			weekday[1]="Tuesday";
			weekday[2]="Wednesday";
			weekday[3]="Thursday";
			weekday[4]="Friday";
			weekday[5]="Saturday";
			weekday[6]="Sunday";
			if (whichDay === "yesterday") {
				if (dd === 0) {
					return weekday[5];
				}
			}
			if (whichDay === "dayBefore") {
				if (dd === 0) {
					return weekday[4];
				}
			}
			if (whichDay === "twoDaysBefore") {
				if (dd === 0) {
					return weekday[3];
				}
			}
			return weekday[dd];
		};

		/** Submits the survey to Mongo. */
		$scope.submitSurvey = function() {
			var survey = {
				yesterday: {
					dateString: $scope.yesterday,
					breakfast: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.yesterdayBreakfast.length; i += 1) {
							arr.push($scope.yesterdayBreakfast[i].text);
						}
						return arr;
					})(),
					lunch: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.yesterdayLunch.length; i += 1) {
							arr.push($scope.yesterdayLunch[i].text);
						}
						return arr;
					})(),
					dinner: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.yesterdayDinner.length; i += 1) {
							arr.push($scope.yesterdayDinner[i].text);
						}
						return arr;
					})()
				},
				dayBeforeYesterday: {
					dateString: $scope.dayBeforeYesterday,
					breakfast: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.dayBeforeYesterdayBreakfast.length; i += 1) {
							arr.push($scope.dayBeforeYesterdayBreakfast[i].text);
						}
						return arr;
					})(),
					lunch: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.dayBeforeYesterdayLunch.length; i += 1) {
							arr.push($scope.dayBeforeYesterdayLunch[i].text);
						}
						return arr;
					})(),
					dinner: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.dayBeforeYesterdayDinner.length; i += 1) {
							arr.push($scope.dayBeforeYesterdayDinner[i].text);
						}
						return arr;
					})()
				},
				twoDaysBeforeYesterday: {
					dateString: $scope.twoDaysAgo,
					breakfast: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.twoDaysbeforeYesterdayBreakfast.length; i += 1) {
							arr.push($scope.twoDaysbeforeYesterdayBreakfast[i].text);
						}
						return arr;
					})(),
					lunch: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.twoDaysbeforeYesterdayLunch.length; i += 1) {
							arr.push($scope.twoDaysbeforeYesterdayLunch[i].text);
						}
						return arr;
					})(),
					dinner: (function() {
						var arr = new Array();
						for (var i = 0; i < $scope.twoDaysbeforeYesterdayDinner.length; i += 1) {
							arr.push($scope.twoDaysbeforeYesterdayDinner[i].text);
						}
						return arr;
					})()
				},
				user: $scope.Authentication.user._id
			};
			$http.post('/api/users/submitSurvey', survey)
				.success(function(data) {
				});
			$location.path('/settings/profile');
		};

	}
]);

