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
                //Disable back button for the next view, which is here the homepage.
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.search');
            }, 2500);
        });
    });
    
    $scope.removeFromFavorites = function(index,id){
        $scope.qode.favorites.splice(index,1);
        userFactory.removeFromFavorites(id);
    };
    
    $scope.deleteQode = function(index,id){
        $scope.qode.myqodes.splice(index,1);
        userFactory.deleteQode(id);
    };    
    

}]);