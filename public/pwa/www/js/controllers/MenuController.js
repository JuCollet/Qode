'use strict';

angular.module('mobile')
.controller('MenuController', ['$scope', '$rootScope', '$state', 'userFactory', '$ionicHistory', '$ionicPopup', '$timeout', function($scope, $rootScope, $state, userFactory, $ionicHistory, $ionicPopup, $timeout){
    
    $scope.doLogout = function(){
    userFactory.logout().then(function(){
        $rootScope.logged = {
            log:false,
            name:""
        };
    },function(){
        const alertPopup = $ionicPopup.alert({
         title: 'Oops..',
         template: "We can't log you out"
        });
        $timeout(function() {
            alertPopup.close();
        }, 2000);
        
    });
    };
    
}]);