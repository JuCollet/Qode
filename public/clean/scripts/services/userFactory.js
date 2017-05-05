/*global $, angular*/

(function(){
  
  'use strict';

  angular.module('app')
    
    .factory('userFactory', userFactory);
  
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function userFactory($http){
      
      const getUser = function(){return $http.get('/user');},
            addToFavorites = function(){return $http.put('/user/addtofavorites');},
            deleteQode = function(qodeId){return $http.delete('/user/deleteqode/'+qodeId);},
            isLogged = function(){return $http.get('/user/isLogged');},
            login = function(user){return $http.post('/user/login',user);},
            logout = function(){return $http.get('/user/logout');},
            recovery = function(mail){return $http.post('/user/passwordrecovery', {mail:mail});},
            register = function(user){return $http.post('/user', user);},
            reset = function(newPassword){return $http.put('/user', {newPassword:newPassword});},
            removeFromFavorites = function(qodeId){return $http.put('/user/removefromfavorites',{favId:qodeId});};
      
      return {
        getUser : getUser,
        addToFavorites : addToFavorites,
        deleteQode : deleteQode,
        isLogged : isLogged,
        login : login,
        logout : logout,
        recovery : recovery,
        register : register,
        reset : reset,
        removeFromFavorites : removeFromFavorites
      };
  
    }

}());