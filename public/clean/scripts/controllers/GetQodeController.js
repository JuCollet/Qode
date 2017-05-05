/*global $, angular, uiScripts*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('GetQodeController', GetQodeController);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function GetQodeController($rootScope, $scope, qodeFactory, newQodeFactory, userFactory, $state){
      
      const vm = this;
      let selectedQode;

      vm.refresh = refresh; // Displays new Qode;
      vm.getThis = getThis; // Go further when the user choose the displayed Qode;
      
      function refresh(){
        
        const getQodesAsync = qodeFactory.makeMockQodes(5); // mockQodes returns a promise.

        getQodesAsync.then(function qodeIsAvailable(qodes){
          selectedQode = qodes[qodes.length-1];
          uiScripts.displayQodes(qodes);
        }, function qodeIsNotAvailable(){
          vm.refresh();
        });
        
      }

      function getThis(){
        
        qodeFactory.checkIfAvailable(selectedQode, 
          function successCb(){
            // Check if user is logged in or not
            userFactory.isLogged().then(function(res){
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
      }
      
      vm.refresh(); // Displays Qodes when loaded;
      
    } // End GetQodeController

}());