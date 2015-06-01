/** Controller for food journal view.
 *  @author Alan Ponte
 */

'use strict';

angular.module('food-journal').controller('FoodJournalController', ['$scope', '$http', 'Authentication','FoodSurvey', 'Availablefoods',
	function($scope, $http, Authentication, FoodSurvey, Availablefoods) {
		$scope.entries = [];
		$scope.fdaGuides = [];
		$scope.Authentication = Authentication;
		$scope.testQuery = {
			"name": "Subway Chicken & Bacon Ranch Melt"
		}
		$scope.getBreakdown = function(query) {
			if (!query) {
				query = $scope.testQuery;
			}

			Availablefoods.getAvailableFoodsQuery(query)
			.then(function(data) {
				console.log("DATA: " + JSON.stringify(data));
				$scope.foodData = data;
				$scope.chartObject = {
				  "type": "PieChart",
				  "displayed": true,
				  "data": {
				    "cols": [
				      {
				        "id": "saturatedFat",
				        "label": "saturatedFat",
				        "type": "string",
				        "p": {}
				      },
				      {
				        "id": "cholesterol",
				        "label": "cholesterol",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "sodium",
				        "label": "sodium",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "sugars",
				        "label": "sugars",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "totalCarbohydrate",
				        "label": "totalCarbohydrate",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "dietaryFiber",
				        "label": "dietaryFiber",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "protien",
				        "label": "protien",
				        "type": "number",
				        "p": {}
				      },
				    ],
				    "rows": [
				      {
				        "c": [
				          {
				            "v": "saturatedFat"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.saturatedFat.amount,	
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.saturatedFat.amount + " grams"
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "cholesterol"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.cholesterol.amount,
				            "f":$scope.foodData.nutritianContent['%dailyValue'].totalFat.cholesterol.amount + ' grams'
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "sodium"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.sodium.amount,
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.sodium.amount + " grams"
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "sugars"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.sugars.amount,
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.sugars.amount + " grams"
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "totalCarbohydrate"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.totalCarbohydrate.amount,
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.totalCarbohydrate.amount + " grams"
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "dietaryFiber"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.dietaryFiber.amount,
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.dietaryFiber.amount + " grams"
				          },
				          null
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "protien"
				          },
				          {
				            "v": $scope.foodData.nutritianContent['%dailyValue'].totalFat.protien.amount,
				            "f": $scope.foodData.nutritianContent['%dailyValue'].totalFat.protien.amount + " grams"
				          },
				          null
				        ]
				      }
				    ]
				  },
				  "options": {
				    "title": "Breakdown for " + $scope.foodData.name
				  }
				}

			});
	}
		/** Returns the users food journal entries.  This will 
		 *  initally be the information the user entered
		 *  upon registration. */
		$scope.getEntries = function() {
			FoodSurvey.getUserSurveyData($scope.Authentication.user._id)
				.then(function(data) {
					$scope.entries = data;
				});
		};

		/** "Cleans" the String STR.  That is, removes all
		 *   "-" from the string to make it display better. */
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

