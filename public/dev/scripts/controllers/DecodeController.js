'use strict';

angular.module('app')

.controller('DecodeController', ['$scope', 'viewQodeFactory', '$timeout', '$state', function($scope, viewQodeFactory, $timeout, $state){
  
  const $qodeChars = $('.qode-code')[0].children,
        alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let pos = 0,
      qode = "";
  
  document.onkeyup = function(e){
    
    // Check if div Qode is currently in the displayed DOM.
    // Otherwise, this will be triggered everywhere in the site. 
    if(document.getElementById('qodeDecode') !== null){
           
      if(pos<2 && alphabet.indexOf((e.key).toLowerCase()) !== -1){
        $($qodeChars[pos]).text(e.key);
        if(pos<5) {
          qode += e.key.toUpperCase();
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
      if(qode.length === 5 && checking === false){
        $('#status').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Searching...');

        viewQodeFactory.qodes.get({id:qode}).$promise
          .then(function(){
            $('#status').html('<i class="fa fa-check is-green"></i>&nbsp;&nbsp;Found');
            $timeout(function(){
              $state.go('root.qode', {id:qode});
            },500);
          }, function(err){
            $('#status').html(`<i class="fa fa-times is-red"></i>&nbsp;&nbsp;${err.statusText} :(`);
          });
      } else {
        $('#status').html('&nbsp;');
      }
    } // end if;
  }; //end onkeyup function;

}]);