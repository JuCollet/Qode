'use strict';

angular.module('mobile')
.controller('LoginController', ['$scope', '$rootScope', '$state', '$ionicPopup', '$timeout', 'userFactory', '$ionicHistory', function($scope, $rootScope, $state, $ionicPopup, $timeout, userFactory, $ionicHistory){
    
    
    // Didn't used ng-model for form inputs because it didn't updated values with mobile form auto-completion (ios)
    // So when user/password where auto-filled, the ng-models where empty when the doLogin function was triggered.
    $scope.doLogin = function(){
        const user = {
            mail: document.login.mail.value,
            password: document.login.password.value
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