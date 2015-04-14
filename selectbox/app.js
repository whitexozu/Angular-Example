var myOptions = [ {
	"id" : 106,
	"group" : "Group 1",
	"label" : "Item 1"
}, {
	"id" : 107,
	"group" : "Group 1",
	"label" : "Item 2"
} ];


function todoCtrl($scope) {
	$scope.myOptions = myOptions;
	
	$scope.selectAction = function() {
	    console.log($scope.myOption);
	};
}