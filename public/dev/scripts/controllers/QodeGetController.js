/*global $, angular, uiModule*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('QodeGetController', QodeGetController);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function QodeGetController($rootScope, qodeFactory, userFactory, $state){
      
      const vm = this;
      let selectedQode;

      vm.refresh = refresh; // Displays new Qode;
      vm.getThis = getThis; // Go further when the user choose the displayed Qode;
      
      function refresh(){
        
        const getQodesAsync = qodeFactory.makeMockQodes(5); // mockQodes returns a promise.

        getQodesAsync.then(function qodeIsAvailable(qodes){
          selectedQode = qodes[qodes.length-1];
          uiModule.displayQodes(qodes);
        }, function qodeIsNotAvailable(){
          vm.refresh();
        });
        
      }

      function getThis(){
        
        qodeFactory.doCheckIfAvailable(selectedQode, 
          function successCb(){
            // Check if user is logged in or not
            userFactory.isLogged().then(function(res){
              if(res.data.isLogged !== undefined && res.data.isLogged.log === true) {
                qodeFactory.createQode(selectedQode).then(function(){
                  $state.go('root.editqode', {qode:selectedQode});
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