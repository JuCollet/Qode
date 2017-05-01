'use strict';

angular.module('app')

.controller('NavController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){

  let encodeQode = $state.params.encode || 'encode';
  const posEncode = 4,
        posDecode = 34,
        toggleSpeed = 50,
        $switchQode = $(".switch"),
        $switchCursor = $(".switch-cursor");
  
  const setToggle = function(){
    if(encodeQode === 'encode') {
      $switchCursor.css({marginLeft:`${posEncode}px`});
    } else {
      $switchCursor.css({marginLeft:`${posDecode}px`});
    }
  }();
  
  $scope.switchToggle = function(){
    if(encodeQode === 'decode') {
      $switchCursor.animate({marginLeft:`${posEncode}px`}, toggleSpeed, function(){
        $state.go('root.encode', {encode:'encode'});
      });
    } else {
      if($(window).width() > 768) {
        $switchCursor.animate({marginLeft:`${posDecode}px`}, toggleSpeed, function(){
          $state.go('root.decode', {encode:'decode'});
        });
      } else {
        $switchCursor.animate({marginLeft:`${posDecode}px`}, toggleSpeed, function(){
          $state.go('root.decodexs', {encode:'decode'});
        });
      }
    }
  };

  $switchQode.tooltip({"show": 200, "hide": 500 });

}]);
