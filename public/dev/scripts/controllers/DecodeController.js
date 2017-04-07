'use strict';

angular.module('app')

.controller('DecodeController', ['$scope', function($scope){
  
  const $qodeChars = $('.qode-code')[0].children,
        alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let pos = 0,
      qode = "";
  
  $scope.complete = false;
  
  document.onkeyup = function(e){
    
    if(pos<2 && alphabet.indexOf((e.key).toLowerCase()) !== -1){
      $($qodeChars[pos]).text(e.key);
      if(pos<5) {
        qode += e.key;
        pos++;
      }      
    } else if(pos > 1 && parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
      $($qodeChars[pos]).text(e.key);
      if(pos<=4) {
        qode += e.key;
        pos++;
      }            
    }
    if(e.key === "Backspace"){
      if(pos>0) {
        pos--;
        qode = qode.slice(0,pos);
      }
      $($qodeChars[pos]).html("&nbsp;");
    }
    if(qode.length === 5){
      $('#status').html('<i class="fa fa-refresh"></i>&nbsp;&nbsp;Searching...');
    } else {
      $('#status').html('&nbsp;');
    }
  };
  
}]);