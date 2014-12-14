var app = angular.module('app', []);

app.directive('dynamic', function($compile) {
	return {
		restrict : 'A',
		replace : true,
		link : function(scope, ele, attrs) {
			scope.$watch(attrs.dynamic, function(html) {
				ele.html(html);
				$compile(ele.contents())(scope);
			});
		}
	};
});

function MyController($scope) {
	$scope.click = function(arg) {
		alert('Clicked ' + arg);
	}
	$scope.html = '<a ng-click="click(1)" href="#">Click me</a>';
}