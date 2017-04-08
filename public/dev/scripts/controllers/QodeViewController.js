'use strict';

angular.module('app')

.controller('QodeViewController', ['$scope', '$stateParams', 'qodeViewFactory', function($scope, $stateParams, qodeViewFactory){
    
    $scope.data = qodeViewFactory.query({id:$stateParams.id}).$promise
    .then((res)=>{
      $scope.qode = res[0];
    });
  
}]);