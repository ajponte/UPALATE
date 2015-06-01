'use strict';

angular.module('my-profile').controller('MyProfileController', ['$scope', '$location','Authentication',
	function($scope, $location, Authentication) {
		$scope.showFoodJournal = function() {
			$location.path('#!/');
		};
	}
]);