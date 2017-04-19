'use strict';

angular.module('app')

.controller('ViewQodeController', ['$scope', '$stateParams', 'viewQodeFactory', 'userFactory', function($scope, $stateParams, viewQodeFactory, userFactory){
    
    $scope.data = viewQodeFactory.query({id:$stateParams.id}).$promise
    .then((res)=>{
      $scope.qode = res[0];
    });

    $scope.thanksAuthor = function(qode){
      
    
      
    }; // end thanksAuthor function
    
    $scope.addToFavorites = function(qodeId){
      
      userFactory.user.update({favId:qodeId}).$promise.then(function success(){
        
      }, function error(){
        
      });
      
      
    }; // end addToFavorites function
  
}]);