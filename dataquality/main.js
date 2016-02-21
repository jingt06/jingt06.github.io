(function(){
	angular.module("perbikepertripReport",[])
	.controller("MainController",["$scope","$http",
		function($scope,$http){
 		$scope.WeBikes = bikes;
 		$scope.bike_detail = {};

 		$scope.show_bike_detail = function(imei){
 			if($scope.bike_detail.hasOwnProperty(imei)){
 				delete $scope.bike_detail[imei];
 			}else{
 				$scope.bike_detail[imei] = {};
 			}
 		}
 		$scope.show_trip_detail = function(imei, tid){
 			if($scope.bike_detail[imei].hasOwnProperty(tid)){
 				delete $scope.bike_detail[imei][tid];
 			}else{
 				$scope.bike_detail[imei][tid] = true;
 			}
 			
 		}
 		$scope.detial_show = function(imei,tid){
 			if(!$scope.bike_detail.hasOwnProperty(imei)){
 				return false;
 			}else if(!$scope.bike_detail[imei].hasOwnProperty(tid)){
 				return false;
 			}else{
 				return true;
 			}
 		}
 		$scope.getcolor = function(valid){
 			if(valid === 0){
 				return "#ff0000";//red
 			}else{
 				return "#adff2f";//green
 			}
 		}
}])
}())