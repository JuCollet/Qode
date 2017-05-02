'use strict';

angular.module('mobile')

.controller('QodeViewController', ['$scope', '$stateParams', 'qodeFactory', function($scope, $stateParams, qodeFactory) {
    
    qodeFactory.getQode($stateParams.id).then(function(res){
        $scope.qode = res.data;
      },function(err){
        console.log(err);
      });
    
}]);









