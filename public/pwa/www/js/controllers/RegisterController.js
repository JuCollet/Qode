'use strict';

angular.module('mobile')
.controller('RegisterController', ['$scope', '$rootScope', '$state', '$ionicPopup', '$timeout', 'userFactory', '$ionicHistory', '$ionicLoading', function($scope, $rootScope, $state, $ionicPopup, $timeout, userFactory, $ionicHistory, $ionicLoading){
    
    $scope.name="";
    $scope.mail="";
    $scope.password="";
    $scope.confirmPassword="";
    
    $scope.doRegister = function(){
        $ionicLoading.show();
    
        const data = {
            name : $scope.name,
            mail : $scope.mail,
            password : $scope.password,
            confirmPassword : $scope.confirmPassword
        };
        
        if(data.password !== data.confirmPassword) {
            $ionicLoading.hide();
            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: "Passwords doesn't match"
            });
            $timeout(function() {
                alertPopup.close();
            }, 2500);
            return;
        }
        
        userFactory.register(data).then(function(res){
            $rootScope.logged = {
                log : true,
                name : res.name
            };
            //Disable back button for the next view, which is here the homepage.
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicLoading.hide();
            $state.go('app.search');
        },function(err){
            $ionicLoading.hide();

            const alertPopup = $ionicPopup.alert({
             title: 'Oops..',
             template: err.statusText
            });
            $timeout(function() {
                alertPopup.close();
                //Disable back button for the next view, which is here the homepage.
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.search');
            }, 2500);
        });
        
    };
    
}]);