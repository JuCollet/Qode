/*global $, angular, uiModule*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('QodeSearchController', QodeSearchController);
    
      /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
      function QodeSearchController(qodeFactory, $timeout, $state){
        
        var vm = this;

        vm.keyPressed = function(char){
          uiModule.searchQodesHandler(char, qodeFactory.getQode, $timeout, $state);
        };


      } // End SearchQodeController;

}());