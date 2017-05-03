'use strict';

angular.module('mobile')
.controller('LoginController', ['$scope', '$rootScope', '$state', '$ionicPopup', '$timeout', 'userFactory', '$ionicHistory', function($scope, $rootScope, $state, $ionicPopup, $timeout, userFactory, $ionicHistory){
    
    $scope.mail = "";
    $scope.password = "";
    
    $scope.doLogin = function(){
        const user = {
            mail: $scope.mail,
            password: $scope.password
        };
        
        userFactory.login(user).then(function(res){
            $rootScope.logged = {
                log: true,
                name: res.name
            };
            //Disable back button for the next view, which is here the homepage.
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.search');
        },function(){
            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: "We didn't find you"
            });
            $timeout(function() {
                alertPopup.close();
            }, 2500);
        });
        
    };
    
}]);