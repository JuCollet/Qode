'use strict';

angular.module('app')

.controller('QodeViewController', ['$scope', '$stateParams', 'qodeViewFactory', function($scope, $stateParams, qodeViewFactory){
    
    $scope.data = qodeViewFactory.query().$promise
    .then((res)=>{
      console.log(res);
      $scope.qode = res[0];
    });
  
}]);