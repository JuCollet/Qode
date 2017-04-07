'use strict';

angular.module('app')

.controller('QodeController', ['$rootScope','$scope','qodeFactory', function($rootScope, $scope, qodeFactory){
    
  const $qodeChars = $('.qode-code')[0].children;
  let mockQodes = qodeFactory.mockQodes(5),
      i = 0, j = 0;

  $scope.refreshQode = function(){
    mockQodes = qodeFactory.mockQodes(5);
    $scope.charsDisplay();
  };

  $scope.charsDisplay = function(){
    setTimeout(function(){
      if(i<mockQodes.length){
        if(j<mockQodes[0].length){
          $($qodeChars[i]).text(mockQodes[j][i]);
          j++;
          $scope.charsDisplay();
          return;
        } else {
          j = 0;
          i++;
          $scope.charsDisplay();
          return;
        }
      } else {
        i = 0;
        return;
      }
    },25);
  };
  
  $scope.charsDisplay();


}]);
