'use strict';

angular.module('my-profile').directive('myProfile', [
	function() {
		return {
			template: '<div style="color:white">Im a directive</div>'
			/*restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// My profile directive logic
				// ...

				element.text('this is the myProfile directive');
			}*/
		};
	}
]);