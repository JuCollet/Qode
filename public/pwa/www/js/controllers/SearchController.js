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
  
  let checking = false;
  
  $scope.jumpnext = function(nextid){
    $('#status').html('&nbsp;');
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
             
             $('#status').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Searching...');
             
             const qode = char1.value+char2.value+char3.value+char4.value+char5.value;
             
             qodeFactory.getQode(qode).then(function(res){
              document.activeElement.blur();
              $('#status').html('<i class="fa fa-check is-green"></i>&nbsp;&nbsp;Found');
              reset();
              $timeout(function(){
               $state.go('app.qodeview', {id:qode});
              }, 500);
             },function(err){
               $('#status').html(`<i class="fa fa-times is-red"></i>&nbsp;&nbsp;${err.statusText} :(`);
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

    