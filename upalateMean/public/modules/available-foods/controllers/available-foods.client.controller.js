'use strict';

angular.module('available-foods').controller('AvailableFoodsController', ['$scope', '$http',
	function($scope, $http) {
		$scope.getAllFood = function() {
			$http.post('/api/foodData/availableFoods', {"name":"fake"})
				.success(function(data) {
					console.log("the data: " + JSON.stringify(data));
				})
		}
	}
]);