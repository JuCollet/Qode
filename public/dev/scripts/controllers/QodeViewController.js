/*global $, angular, uiModule*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('QodeViewController', QodeViewController);
    
      /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
      function QodeViewController(qodeFactory, userFactory, $rootScope, $stateParams, $state){
        
        const vm = this;
        
        var getQodeData;
        
        vm.likeThis = likeThis;
        vm.addToFavorites = addToFavorites;
        
        
        (function getQodeData(){
          qodeFactory.getQode($stateParams.qode).then(function success(res){
            vm.qode = res.data;
          }, function error(err){
            $rootScope.$broadcast('notification',{
              color:'red', 
              message: err.data.error.message, 
              title:'Oops...', 
              glyph:'fa fa-times'
            });
            $state.go('root.getqode', {encode:'encode'});
          });
        }());
        
        
        function likeThis(qodeId){
          qodeFactory.upVote(qodeId).then(function(){
            vm.qode.upVotes++;
            vm.qode.isLiked = true;
          });
        }


        function addToFavorites(qodeId){
          userFactory.addToFavorites(qodeId).then(function(){
            vm.qode.isFavorited = true;
          });
        }
      
      }
    
}());