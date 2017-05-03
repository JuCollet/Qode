'use strict';

angular.module('mobile')

.controller('QodeViewController', ['$scope', '$stateParams', 'qodeFactory', '$ionicPopup', '$timeout', function($scope, $stateParams, qodeFactory, $ionicPopup, $timeout) {
    
    qodeFactory.getQode($stateParams.id).then(function(res){
        $scope.qode = res.data;
      },function(err){
        const alertPopup = $ionicPopup.alert({
         title: 'Oops..',
         template: err.statusText
        });
        $timeout(function() {
            alertPopup.close();
        }, 2500);
      });
    
}]);









