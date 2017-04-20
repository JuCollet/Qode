'use strict';

angular.module('app')

.controller('ViewQodeController', ['$scope', '$stateParams', 'viewQodeFactory', 'userFactory', function($scope, $stateParams, viewQodeFactory, userFactory){
    
    $scope.data = viewQodeFactory.qodes.get({id:$stateParams.id}).$promise
    .then((res)=>{
      $scope.qode = res;
    });
  
    $scope.thanksAuthor = function(qode){
      viewQodeFactory.qodes.upvote({toUpvote:qode}).$promise.then(function(){
        $scope.qode.isLiked = true;
      });
    }; // end thanksAuthor function
    
    $scope.addToFavorites = function(qodeId){
      userFactory.user.put({favId:qodeId}).$promise.then(function(){
      $scope.qode.isFavorited = true;
      });
    }; // end addToFavorites function
  
}]);