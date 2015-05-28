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
				,{code: "I1", value: "힘이 넘치는 상태로 걸을 때"} 
				,{code: "J1", value: "피곤한 상태로 걸을 때(산책이 끝날 무렵)"}
				,{code: "K1", value: "보호자를 맞이할 때"}
				,{code: "L1", value: "낯선 사람을 만났을 때"}
				,{code: "M1", value: "친구를 만났을 때"}
				,{code: "N1", value: "초인종이 울렸을 때"}
				,{code: "O1", value: "문이 잠겨 있는데 안으로 들어가고 싶을때"}
				,{code: "P1", value: "놀이 친구인 친한 개를 만났을 때"}
				,{code: "Q1", value: "줄을 하지 않은 낯선 개를 만났을 때"}
				,{code: "R1", value: "줄을 한 낯선 개를 만났을 때"} ];
	
	var items = [ {code: "I1", value: "귀"}
				,{code: "I2", value: "시선"}
				,{code: "I3", value: "눈 크기"}
				,{code: "I4", value: "입"}
				,{code: "I5", value: "머리위치"}
				,{code: "I6", value: "꼬리위치"}
				,{code: "I7", value: "꼬리움직임"}
				,{code: "I8", value: "몸의 무게 중심"} ];
	
	var modalOptionsObject = {};
	var ear = {};
	ear["F"] = "앞으로 쫑긋 세움(F)";
	ear["S"] = "옆으로 쫑긋 세움(S)";
	ear["SV"] = "양옆으로 굽히거나 V자 형태로 함 (SV)";
	ear["BB"] = "뒤로 살짝 눕힘(BB)";
	ear["BF"] = "뒤로 젖혀 머리에 납작하게 붙임 (BF)";
	modalOptionsObject["I1"] = ear;
	
	var eyes = {};
	eyes["S"] = "정면으로 노려보거나 빤히 쳐다봄 (S)";
	eyes["A"] = "회피함 (A)";
	eyes["D"] = "이리저리 좌우로 시선을 피함 (D)";
	modalOptionsObject["I2"] = eyes;
	
	var eyeSize = {};
	eyeSize["VW"] = "최대한 크게 뜸. 평소보다 흰자위가 많이보임 (VW)";
	eyeSize["W"] = "크게 뜸 (W)";
	eyeSize["HC"] = "가늘게 뜸. 반쯤 뜸 (HC)";
	eyeSize["C"] = "감음 (C)";
	modalOptionsObject["I3"] = eyeSize;
	
	var mouth = {};
	mouth["C"] = "다움(C)";
	mouth["LL"] = "입술을 핥음 (LL)";
	mouth["AP"] = "입에 부자연스럽게 주름 잡음 또는 복종적인 미소 (AP)";
	mouth["FG"] = "두려움의 미소 또는 얼굴 찡그림 (FG)";
	mouth["P"] = "헐떡임 (P)";
	mouth["Y"] = "하품함 (Y)";
	modalOptionsObject["I4"] = mouth;
	
	var head = {};
	head["AB"] = "몸보다 위 (AB)";
	head["BB"] = "몸보다 아래 (BB)";
	head["B"] = "몸과 수평 (B)";
	modalOptionsObject["I5"] = head;
	
	var tailPostion = {};
	tailPostion["SH"] = "하늘을 향해 최대한 높게 (SH)";
	tailPostion["AB"] = "등보다 더 위 (AB)";
	tailPostion["LB"] = "등과 수평 또는 약간 아래 (LB)";
	tailPostion["H"] = "바닦을 향해 늘어뜨림 (H)";
	tailPostion["BL"] = "뒷다리 사이에 (BL)";
	modalOptionsObject["I6"] = tailPostion;
	
	var tailMovement = {};
	tailMovement["M"] = "움직임 없음 (M)";
	tailMovement["C"] = "원을 그리며 빙빙 돌림 (C)";
	tailMovement["S"] = "천천히 좌우로 흔듦 (S)";
	tailMovement["F"] = "짧고 빠른 날갯짓 처럼 흔듦 (F)";
	tailMovement["R"] = "뒷다리와 엉덩이까지 함께 흔듦 (R)";
	modalOptionsObject["I7"] = tailMovement;
	
	var centerOfBody = {};
	centerOfBody["LF"] = "앞으로 기대어 체중을 앞다리에 실음 (LF)";
	centerOfBody["LB"] = "뒤로 기대며 체중을 뒷다리에 실음 (LB)";
	centerOfBody["EBT"] = "균형을 유지하나 긴장 상태 (EBT)";
	centerOfBody["EBT"] = "근육이 이완된 균형 상태 (EBR)";
	centerOfBody["C"] = "웅크림 (C)";
	modalOptionsObject["I8"] = centerOfBody;
	
	angular.module('ethogramApp', ['ngCookies', 'ngResource'])
	.controller('ethogramController', [ '$scope', '$cookies', '$cookieStore', '$q', 'ethogramSvc', function($scope, $cookies, $cookieStore, $q, ethogramSvc) {
//	angular.module('ethogramApp', ['ngCookies'])	
//	.controller('ethogramController', [ '$scope', '$cookies', '$cookieStore', function($scope, $cookies, $cookieStore) {
		$scope.appName = 'My dog ethogram chart';
		$scope.cates = cates;	//view 에서 사용을 위해 scope 변수에 저장
		$scope.items = items;	//view 에서 사용을 위해 scope 변수에 저장
//		$scope.dogs = $cookieStore.get('dogs') === undefined ? [] : $cookieStore.get('dogs');	//cookie 의 dogs 정보 조회
		$scope.dogs = new Array();	//mongolab 의 dogs 정보 조회
		$scope.viewChart = false;	//화면전화용 switch 값, (false:litst, true:ethogram chart)
		$scope.idx = 0;	//강아지 순서
		$scope.q = '';	//강아지 이름
		$scope.key = '';	//선택한 ethogrma input key
		$scope.value = '';	//선택한 ethogrma input value
		$scope.options = new Array();	//modal list 동적 변경을 위한 변수
		$scope.selectedOption = {code:null};	//mldal list 중 선택 된 코드정보
		
//		$cookieStore.put('myFavorite', 'oatmeal');
//		console.log('favoriteCookie', $cookieStore.get('myFavorite'));
		
		
		$scope.selectDogs = function() {
			var selectPromise = ethogramSvc.query({
				q : JSON.stringify({unikey : '1868'})
			}).$promise;
			
			selectPromise.then(function (data) {
				console.log("[info] selectPromise data : ", data);
				deferred.resolve(data);
			}, function(err) {
				console.log("[error] selectPromise err : ", err);
				deferred.reject(data);
			});
		};
		
		$scope.updateDogs = function() {
			var dogsClone = angular.extend({}, $scope.dogs);
			delete dogsClone._id
			var updatePormise = ethogramSvc.update({
				id : o["_id"].$oid
			}, dogsClone).$promise;
			
			updatePormise.then(function (data) {
				console.log("[info] updatePormise data : ", data);
			}, function(err) {
				console.log("[error] updatePormise err : ", err);
			});
		};
		
		$scope.setDogs = function() {
			var selectDogsPromise = $scope.selectDogs();
			selectDogsPromise.then(function(data) {
				console.log("[info] setDogs data : ", data);
			}, function(err) {
				console.log("[error] setDogs err : ", err);
			});
		};
		
		$scope.selectDogs = function() {
			var selectDogsPromise = ethogramSvc.query({
				q : JSON.stringify({unikey : '1868'})
			}).$promise;
			
			selectDogsPromise.then(function (data) {
				deferred.resolve(data);
			}, function(err) {
				deferred.reject(data);
			});
		};
		
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
//			console.log('newChart', newChart);
			
			$scope.dogs.push({
				done : false,
				name : newDogName,
				data : newChart
			});
			$scope.newDogName = '';
			$cookieStore.put('dogs', $scope.dogs);
		};
		
		$scope.removeDogName = function(index) {
//			console.log('index', index);
			for (var i = $scope.dogs.length - 1; i >= 0; i--) {
				if (i == index) {
					$scope.dogs.splice(i, 1);
				}
			};
			$cookieStore.put('dogs', $scope.dogs);
		};
		
		$scope.viewEthogram = function(index) {
//			console.log('index', index);
			$scope.idx = index;
			$scope.q = $scope.dogs[index].name;
//			console.log('$scope.q', $scope.q);
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
		
		$scope.showOptionModal = function(key, value) {
			//modal 에서 option 선택 시 저장을 위해 키값 변수에 저장
			$scope.key = key;
			
			//선택된 option 값 초기화
			$scope.selectedOption.code = null;
			
			//선택한 input key 값에 따라 modal option list 동적 변경 
			$scope.options = modalOptionsObject[ key.split("-")[1] ];
			
			//기존 데이터가 있으면 option radio 선택되도록
			//기존 데이터가 있으면 $scope.selectedOption code 값 입력 되도록
			if(value != null) {
				$scope.selectedOption.code = value;
			}
				
			$('#optionModal').modal('show');
		};
		
		$scope.hideOptionModal = function() {
//			console.log('Modal hidden modalCode', $scope.selectedOption.code);
//			console.log('Modal hidden $scope.idx', $scope.idx);
//			console.log('Modal hidden $scope.key', $scope.key);
//			console.log('Modal hidden $scope.dogs[$scope.idx].data', $scope.dogs[$scope.idx].data);
			//선택된 option 값으로 dogs.Data 변경
			angular.forEach($scope.dogs[$scope.idx].data, function(a, i) {
				angular.forEach(a, function(v, k) {
					if(k == $scope.key) {
						a[k] = $scope.selectedOption.code;
					}
				});
			});
			
			//선택된 option 값 초기화
			$scope.selectedOption.code = null;
			
//			var el = $scope.getScope($scope.selectedInput.$id);
//			console.log(el);
//			el.value = $scope.selectedOption.code;
			
			$('#optionModal').modal('hide');
		};
		
		$scope.getOptionValue = function(key, value) {
			return modalOptionsObject[ key.split('-')[1] ][value];
		}
		
		$scope.getScope = function(id) {
			var elem;
			$('.ng-valid').each(function() {
				var s = angular.element(this).scope(); 
				var sid = s.$id;

				if (sid == id) {
					elem = this;
					return false; // stop looking at the rest
				}
			});
			return elem;
		}
	} ])
	.value('mogolabApiKey', 'CGqtq1d4GQZd7JYudZOMjZsvT6lavGNj')
	.factory('ethogramSvc', [ '$resource', 'mogolabApiKey', function($resource, mogolabApiKey) {
		var ethogramSvc = $resource('https://api.mongolab.com/api/1/databases/sample/collections/ethogram/:id?apiKey=:apiKey', {
			apiKey : mogolabApiKey
		}, {
			'update' : {
				method : 'PUT'
			}
		});

		return ethogramSvc;
	} ]);
})(window.angular);