'use strict';

angular.module('mobile')

.controller('QodeViewController', ['$scope', '$stateParams', 'qodeFactory', '$ionicPopup', '$timeout', '$ionicLoading', function($scope, $stateParams, qodeFactory, $ionicPopup, $timeout, $ionicLoading) {
    
    $ionicLoading.show();

    $scope.$on("$ionicView.beforeEnter", function(){
    
        qodeFactory.getQode($stateParams.id).then(function(res){
            $scope.qode = res.data;
            $ionicLoading.hide();
          },function(err){
            $ionicLoading.hide();
            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: err.statusText
            });
            $timeout(function() {
                alertPopup.close();
            }, 2500);
          });
        
    });
    
    $scope.likeQode = function(qodeId){
        qodeFactory.upVote(qodeId).then(function(){
            $scope.qode.upVotes++;
            $scope.qode.isLiked = true;
        },function(err){
            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: err.statusText
            });
            $timeout(function() {
                alertPopup.close();
            }, 2500);
        });
    };

    $scope.addToFavorites = function(qodeId){
        qodeFactory.addToFavorites(qodeId).then(function(){
            $scope.qode.isFavorited = true;
        },function(err){
            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: err.statusText
            });
            $timeout(function() {
                alertPopup.close();
            }, 2500);
        });
    };

    
}]);









