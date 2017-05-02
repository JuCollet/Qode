'use strict';

angular.module('mobile')

.controller('QodeController', ['$scope', 'qodeFactory', function($scope, qodeFactory) {
    
  $scope.jumpnext = function(nextid){
    switch(nextid){
      case 1:
        document.decode.char2.focus();
        break;
      case 2:
        document.decode.char3.focus();
        break;
      case 3:
        document.decode.char4.focus();
        break;
      case 4:
        document.decode.char5.focus();
        break;
      case 5:
        if(document.decode.char1.value !== "" &&
           document.decode.char2.value !== "" &&
           document.decode.char3.value !== "" &&
           document.decode.char4.value !== "" &&
           document.decode.char5.value !== "") {
             
           } else {
             document.decode.char1.value = "";
             document.decode.char2.value = "";
             document.decode.char3.value = "";
             document.decode.char4.value = "";
             document.decode.char5.value = "";
           }
    }
  };
    
    
}]);

    