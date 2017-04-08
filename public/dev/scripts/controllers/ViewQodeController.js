'use strict';

angular.module('app')

.controller('ViewQodeController', ['$scope', '$stateParams', 'viewQodeFactory', function($scope, $stateParams, viewQodeFactory){
    
    $scope.data = viewQodeFactory.query({id:$stateParams.id}).$promise
    .then((res)=>{
      $scope.qode = res[0];
    });
  
}]);