'use strict';

angular.module('mobile')
  .factory('userFactory', ['$http', function($http){
    
      const getUser = function(){return $http.get('/user');},
            addToFavorites = function(){return $http.put('/user/addtofavorites');},
            deleteQode = function(qodeId){return $http.delete('/user/deleteqode/'+qodeId);},
            isLogged = function(){return $http.get('/user/isLogged');},
            login = function(user){return $http.post('/user/login',user);},
            logout = function(){return $http.get('/user/logout');},
            recovery = function(){return $http.post('/user/passwordrecovery');},
            register = function(data){return $http.post('/user',data);},
            reset = function(){return $http.put('/user');},
            removeFromFavorites = function(id){return $http.put('/user/removefromfavorites',{favId:id});};
    
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
    
  }]);