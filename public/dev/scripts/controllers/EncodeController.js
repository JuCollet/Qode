'use strict';

angular.module('app')

.controller('EncodeController', ['$rootScope','$scope','qodeFactory', 'newQodeFactory', 'userFactory', '$state', function($rootScope, $scope, qodeFactory, newQodeFactory, userFactory, $state){
    
  const $qodeChars = $('.qode-code')[0].children;
  let i = 0, j = 0, selectedQode;

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

$scope.getThisQode = function(){
  qodeFactory.checkQodeIfAvailable(selectedQode, 
    function successCb(){
      // Check if user is logged in or not
      userFactory.user.isLogged().$promise.then(function(res){
        if(res.isLogged !== undefined && res.isLogged.log === true) {
          newQodeFactory.dbOperations.create({qode:selectedQode}).$promise.then(function(){
            $state.go('root.newQode', {qode:selectedQode});
          });
        } else {
          $rootScope.$broadcast('notification',{
            color:'red', 
            message:"You're not logged", 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        }
      });
    }, function errorCb(){
      $rootScope.$broadcast('notification',{
        color:'red', 
        message:"It's not available anymore", 
        title:'Oops...', 
        glyph:'fa fa-times'
      });
  });
};
  
$scope.getQodes = function(){

  // mockQodes returns a promise.
  let getQodesAsync = qodeFactory.mockQodes(5);

  getQodesAsync.then(function(qodes){
    selectedQode = qodes[qodes.length-1];
    displayQodes(qodes);
  }, function(){
    $scope.getQodes();
  });
  
};

$scope.getQodes();
       
}]);
