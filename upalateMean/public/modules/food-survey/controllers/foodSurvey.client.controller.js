'use strict'


/** Angular controller for the food survey.
 *  @author Alan Ponte
 */
<<<<<<< HEAD
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
=======
angular.module('food-survey').controller('foodSurveyController', ['$scope', '$http', '$resource','$window', '$location', 'Authentication',
	function($scope, $http, $resource, $window, $location, Authentication) {
	var tags = $resource('foodNames.json');

	  $scope.loadTags = function(query) {
	    return tags.query().$promise;
	  };

		$http.post('/api/foodData/availableFoods',{})
			.success(function(data) {
				$scope.availableFoods = data;
				//console.log("food: " + JSON.stringify(data));
		});

		$scope.Authentication = Authentication;


		/** Returns yesterdays date. */
		$scope.yesterday = (function() {
			var today = new Date();
			var day = today.getDay();
			console.log("yesterday: " + day);
>>>>>>> origin/imtootired
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
<<<<<<< HEAD
			return getDayString(day) + ' ' + today;
		})();

		/** Returns the day before yesterday's date. */
		$scope.dates.dayBeforeYesterday = (function() {
			var today = new Date();
			var day = (today.getDay() - 3) % 7;
=======
			return getDayString(day, "yesterday") + ' ' + today;
		})();

		/** Returns the day before yesterday's date. */
		$scope.dayBeforeYesterday = (function() {
			var today = new Date();
			var day = today.getDay();
>>>>>>> origin/imtootired
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
<<<<<<< HEAD
			return getDayString(day) + ' ' + today;
=======
			return getDayString(day, "dayBefore") + ' ' + today;
>>>>>>> origin/imtootired
		})();

		/** Returns a String of the date two days 
		 *  ago from today. */
<<<<<<< HEAD
		$scope.dates.twoDaysAgo = (function() {
			var today = new Date();
			var day = (today.getDay() - 4) % 7;
=======
		$scope.twoDaysAgo = (function() {
			var today = new Date();
			var day = today.getDay() % 7;
>>>>>>> origin/imtootired
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
<<<<<<< HEAD
			return getDayString(day) + ' ' + today;
=======
			return getDayString(day, "twoDaysBefore") + ' ' + today;
>>>>>>> origin/imtootired
		})();

		/** Returns the String representation of 
		 *  the day DD. */
<<<<<<< HEAD
		 function getDayString(dd) {
=======
		 function getDayString(dd, whichDay) {
		 	console.log("dd: " + dd);
>>>>>>> origin/imtootired
			var weekday = new Array(7);
			weekday[0]="Monday";
			weekday[1]="Tuesday";
			weekday[2]="Wednesday";
			weekday[3]="Thursday";
			weekday[4]="Friday";
			weekday[5]="Saturday";
			weekday[6]="Sunday";
<<<<<<< HEAD
=======
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
>>>>>>> origin/imtootired
			return weekday[dd];
		};

		/** Submits the survey to Mongo. */
		$scope.submitSurvey = function() {
<<<<<<< HEAD
			var survey = {
				yesterday: {
					breakfast: $scope.yesterdayBreakfast,
					lunch: $scope.yesterdayLunch,
					dinner: $scope.yesterdayDinner
				},
				dayBeforeYesterday: {
					breakfast: $scope.dayBeforeYesterdayBreakfast,
					lunch: $scope.dayBeforeYesterdayLunch,
					dinner: $scope.dayBeforeYesterdayDinner
				},
				twoDaysBeforeYesterday: {
					breakfast: $scope.twoDaysbeforeYesterdayBreakfast,
					lunch: $scope.twoDaysbeforeYesterdayLunch,
					dinner: $scope.twoDaysbeforeYesterdayDinner
=======
			console.log("yesterday: " + JSON.stringify($scope.yesterdayBreakfast));
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
>>>>>>> origin/imtootired
				},
				user: $scope.Authentication.user._id
			};
			console.log(JSON.stringify($scope.Authentication.user.email));
			$http.post('/api/users/submitSurvey', survey)
				.success(function(data) {
					console.log("data from post: " + JSON.stringify(data));
				});
<<<<<<< HEAD
=======
			$location.path('/settings/profile');
>>>>>>> origin/imtootired
		};

	}
]);

