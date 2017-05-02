'use strict';

angular.module('mobile')

.controller('SearchController', ['$scope', '$stateParams', 'qodeFactory', '$state', '$timeout', function($scope, $stateParams, qodeFactory, $state, $timeout) {
  
  const char1 = document.decode.char1,
        char2 = document.decode.char2,
        char3 = document.decode.char3,
        char4 = document.decode.char4,
        char5 = document.decode.char5;
        
  const reset = function(){
     char1.value = "";
     char2.value = "";
     char3.value = "";
     char4.value = "";
     char5.value = "";
  };
  
  $scope.jumpnext = function(nextid){
    switch(nextid){
      case 1:
        char2.focus();
        break;
      case 2:
        char3.focus();
        break;
      case 3:
        char4.focus();
        break;
      case 4:
        char5.focus();
        break;
      case 5:
        if(char1.value !== "" &&
           char2.value !== "" &&
           char3.value !== "" &&
           char4.value !== "" &&
           char5.value !== "") {
             
             const qode = char1.value+char2.value+char3.value+char4.value+char5.value;
             
             qodeFactory.getQode(qode).then(function(res){
              document.activeElement.blur();
              reset();
              $timeout(function(){
               $state.go('app.qodeview', {id:qode});
              }, 500);
             },function(){
               document.activeElement.blur();
               reset();
             });
           } else {
              reset();
              document.activeElement.blur();
           }
    }
  };

}]);

    