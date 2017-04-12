'use strict';

angular.module('app')

.controller('EncodeController', ['$rootScope','$scope','qodeFactory', function($rootScope, $scope, qodeFactory){
    
  const $qodeChars = $('.qode-code')[0].children;
  let i = 0, j = 0;

  const displayQodes = function(qodes){
    setTimeout(function(){
      if(i<qodes.length){
        if(j<qodes[0].length){
          $($qodeChars[i]).text(qodes[j][i]);
          j++;
          displayQodes(qodes);
          return;
        } else {
          j = 0;
          i++;
          displayQodes(qodes);
          return;
        }
      } else {
        i = 0;
        return;
      }
    },25);
  };
  
const getQodes = qodeFactory.mockQodes(5);

getQodes.then(function(qodes){
  displayQodes(qodes);
}, function(err){
  console.log(err);
});
       
}]);
