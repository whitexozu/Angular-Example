(function(angular) {
	'use strict';
	
	var cates = [ {code: "A1", value: "잠잘 때"}
				,{code: "B1", value: "밥 먹을 때(다른 동물이 근처에 없는 상황에서)"}
				,{code: "C1", value: "개껌 또는 장난감을 씹을 때"}
				,{code: "D1", value: "집 주변 또는 마당에서 있을 때(사람이나 물건과 아무런 상호작용을 하지 않는 상태로)"}
				,{code: "E1", value: "밥을 기다릴 때"}
				,{code: "F1", value: "먹이 보상을 기다릴 때(뒷다리로 서서 간청하면서)"}
				,{code: "G1", value: "보호자가 쓰다듬어주기를 원할 때"}
				,{code: "H1", value: "대소변 할 자리를 찾기 위해 냄새를 맡고 다닐 때"}
				,{code: "I1", value: "힘이 넘치는 상태로 걸을 때"} ];
	
	var items = [ {code: "I1", value: "귀"}
				,{code: "I2", value: "시선"}
				,{code: "I3", value: "눈 크기"}
				,{code: "I4", value: "입"}
				,{code: "I5", value: "머리위치"}
				,{code: "I6", value: "꼬리위치"}
				,{code: "I7", value: "꼬리움직임"}
				,{code: "I8", value: "몸의 무게 중심"} ];
	
	var dogNames = [];
	
	var ear = [ {code: "F", value: "앞으로 쫑긋 세움(F)"}
				,{code: "S", value: "옆으로 쫑긋 세움(S)"}
				,{code: "SV", value: "양옆으로 굽히거나 V자 형태로 함 (SV)"}
				,{code: "BB", value: "뒤로 살짝 눕힘(BB)"}
				,{code: "BF", value: "뒤로 젖혀 머리에 납작하게 붙임 (BF)"} ];
	var eyes = [ {code: "S", value: "정면으로 노려보거나 빤히 쳐다봄 (S)"}
				,{code: "A", value: "회피함 (A)"}
				,{code: "D", value: "이리저리 좌우로 시선을 피함 (D)"} ];

	
	angular.module('ethogramApp', ['ngCookies'])
	.controller('ethogramController', [ '$scope', '$cookies', '$cookieStore', function($scope, $cookies, $cookieStore) {
		$scope.appName = 'My dog ethogram chart';
		$scope.cates = cates;
		$scope.items = items;
		$scope.dogs = $cookieStore.get('dogs') === undefined ? [] : $cookieStore.get('dogs');
		$scope.viewChart = false; 
		$scope.q = '';
		$scope.options = new Array();
		$scope.selectedOption = {code:''};
		
		$scope.selectedInput;
		
//		$cookieStore.put('myFavorite', 'oatmeal');
		console.log('favoriteCookie', $cookieStore.get('myFavorite'));
		
		// 추가
		$scope.addNewDogName = function(newDogName) {
			var newChart = new Array();
			angular.forEach(cates, function(cv, i) {
				var newItem = {};
				angular.forEach(items, function(iv, j) {
					newItem[cv.code + '-' + iv.code] = null;
//					console.log(i, j, cv, iv);
				});
				newChart.push(newItem);
			});
			console.log('newChart', newChart);
			
			$scope.dogs.push({
				done : false,
				name : newDogName,
				data : newChart
			});
			$scope.newDogName = '';
			$cookieStore.put('dogs', $scope.dogs);
		};
		
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
			$scope.q = $scope.dogs[index].name;
			console.log('$scope.q', $scope.q);
			$scope.viewChart = true;
		};
		
		$scope.changeMode = function() {
			$scope.viewChart = !$scope.viewChart;
		};
		
		$scope.debug = function() {
			console.log($scope.dogs);
		};
		
		$scope.save = function() {
			$cookieStore.put('dogs', $scope.dogs);
		};
		
		$scope.modalShow = function(me, key, value) {
			$scope.selectedInput = me;
			console.log($scope.selectedInput.$id);
			console.log('scope.myModal', key, value);
			if(key.split("-")[1] == "I1") {
				$scope.options = ear;
			} else if(key.split("-")[1] == "I2") {
				$scope.options = eyes;
			} else {
				$scope.options = eyes;
			}
				
			$('#myModal').modal('show');
		};
		
		$scope.modalHide = function() {
			console.log('Modal hidden modalCode', $scope.selectedOption.code);
			
			var el = $scope.getScope($scope.selectedInput.$id);
			console.log(el);
			el.value = $scope.selectedOption.code;
			$('#myModal').modal('hide');
		};
		

		$scope.getScope = function(id) {
			var elem;
			$('.ng-valid').each(function() {
				var s = angular.element(this).scope(), sid = s.$id;

				if (sid == id) {
					elem = this;
					return false; // stop looking at the rest
				}
			});
			return elem;
		}

// $('#myModal').on('show.bs.modal', function(event) {
//			console.log('modal event', event);
//			var button = $(event.relatedTarget);
//			var recipient = button.data('whatever');
//			var modal = $(this);
//			modal.find('.modal-title').text('New message to ' + recipient);
//			modal.find('.modal-body input').val(recipient);
//		})
//		$('#myModal').on('hidden.bs.modal', function (e) {
//			console.log('modal hidden event', e);
//			var b = $(e.relatedTarget);
//			console.log('modal hidden button', b);
//		});
	} ]);
})(window.angular);