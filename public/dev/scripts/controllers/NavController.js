/*global $, angular*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('NavController', NavController);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function NavController($state){
    
    var vm = this;
    var setToggle; // Function that set the switch automatically depending on the current state;
    var switchToggle; // Function that toggle the switch when triggered by the user; 
      
    let encodeQode = $state.params.encode || 'encode';
    const posEncode = 4,
      posDecode = 34,
      toggleSpeed = 50,
      $switchQode = $(".switch"),
      $switchCursor = $(".switch-cursor");
      
    setToggle = (function(){
      if(encodeQode === 'encode') {
        $switchCursor.css({marginLeft:`${posEncode}px`});
      } else {
        $switchCursor.css({marginLeft:`${posDecode}px`});
      }
    }());
      
    vm.switchToggle = function(){
      if(encodeQode === 'decode') {
        $switchCursor.animate({marginLeft:`${posEncode}px`}, toggleSpeed, function(){
          $state.go('root.getqode', {encode:'encode'});
        });
      } else {
        $switchCursor.animate({marginLeft:`${posDecode}px`}, toggleSpeed, function(){
          $state.go('root.search', {encode:'decode'});
        });
      }
    };
      
    $switchQode.tooltip({"show": 200, "hide": 500 }); // Set the tooltip on the switch button;

      
    } // End NavController
  
}());
