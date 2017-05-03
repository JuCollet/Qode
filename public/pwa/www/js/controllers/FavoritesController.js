'use strict';

angular.module('mobile')
.controller('FavoritesController', ['$scope', '$rootScope', '$state', '$ionicPopup', '$timeout', 'userFactory', '$ionicHistory', '$ionicLoading', function($scope, $rootScope, $state, $ionicPopup, $timeout, userFactory, $ionicHistory, $ionicLoading){

    $ionicLoading.show();

    $scope.$on("$ionicView.beforeEnter", function(){
        userFactory.getUser().then(function(res){
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





}]);