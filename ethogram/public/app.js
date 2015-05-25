(function(angular) {
	'use strict';
	
	var cate = [ {code: "A1", value: "잠잘 때"}
				,{code: "B1", value: "밥 먹을 때(다른 동물이 근처에 없는 상황에서)"}
				,{code: "C1", value: "개껌 또는 장난감을 씹을 때"}
				,{code: "D1", value: "집 주변 또는 마당에서 있을 때(사람이나 물건과 아무런 상호작용을 하지 않는 상태로)"}
				,{code: "E1", value: "밥을 기다릴 때"}
				,{code: "F1", value: "먹이 보상을 기다릴 때(뒷다리로 서서 간청하면서)"}
				,{code: "G1", value: "보호자가 쓰다듬어주기를 원할 때"}
				,{code: "H1", value: "대소변 할 자리를 찾기 위해 냄새를 맡고 다닐 때"}
				,{code: "I1", value: "힘이 넘치는 상태로 걸을 때"} ];
	
	var item = [ {code: "I1", value: "귀"}
				,{code: "I2", value: "시선"}
				,{code: "I3", value: "눈 크기"}
				,{code: "I4", value: "입"}
				,{code: "I5", value: "머리위치"}
				,{code: "I6", value: "꼬리위치"}
				,{code: "I7", value: "꼬리움직임"}
				,{code: "I8", value: "몸의 무게 중심"} ];
	
	var dogNames = [];
	
	angular.module('ethogramApp', ['ngCookies'])
	.controller('listController', [ '$scope', '$cookies', '$cookieStore', function($scope, $cookies, $cookieStore) {
		$scope.appName = 'My dog ethogram chart';
		$scope.cate = cate;
		$scope.item = item;
		$scope.dogs = $cookieStore.get('dogs') === undefined ? [] : $cookieStore.get('dogs');
		$scope.viewChart = false; 
		
//		$cookieStore.put('myFavorite', 'oatmeal');
		console.log('favoriteCookie', $cookieStore.get('myFavorite'));
		
		// 추가
		$scope.addNewDogName = function(newDogName) {
			var newChart = new Array();
			angular.forEach(cate, function(cv, i) {
				var newItem = new Array();
				angular.forEach(item, function(iv, j) {
					newItem[cv.code + '-' + iv.code] = null;
//					console.log(i, j, cv, iv);
				});
				newChart.push(newItem);
			});
//			console.log('newChart', newChart);
			
			$scope.dogs.push({
				done : false,
				name : newDogName,
				chart : newChart
			});
			$scope.newDogName = '';
			$cookieStore.put('dogs', $scope.dogs);
		};
		
		// 삭제
		$scope.remove = function(index) {
//			console.log('index', index);
			for (var i = $scope.dogs.length - 1; i >= 0; i--) {
				if (i == index) {
					$scope.dogs.splice(i, 1);
				}
			};
			$cookieStore.put('dogs', $scope.dogs);
		};
		
		$scope.ethogram = function(index) {
			console.log('index', index);
			$scope.viewChart = true;
		};
		
		$scope.changeMode = function() {
			$scope.viewChart = !$scope.chart;
		};
		
		$scope.debug = function() {
			console.log($scope.dogs);
		};
		
		// 완료한 일 삭제
		$scope.archive = function() {
			for (var i = $scope.todoList.length - 1; i >= 0; i--) {
				if ($scope.todoList[i].done) {
					$scope.todoList.splice(i, 1);
				}
			};
		};
		
//		// 남은 할 일 수 계산
//		$scope.remain = function() {
//			var remainCount = 0;
//			angular.forEach($scope.todoList, function(value, key) {
//				if (value.done === false) {
//					remainCount++;
//				}
//			});
//			return remainCount;
//		};
	} ]);
})(window.angular);