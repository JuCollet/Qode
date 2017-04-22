(function(){
  
  'use strict';
  
  angular
    .module('app')
    .factory('userfactory', userfactory)
  
    userfactory.$inject = ['$http'];
  
    function userfactory($http){
      return {
        addfavorite:addfavorite,
        logcheck:logcheck,
        login:login,
        logout:logout,
        register:register,
        removefavorite:removefavorite
      }
      
      function addfavorite() {
        return $http.post('/api/user/addfavorite', data)
          .then(addfavoriteComplete)
          .catch(addfavoriteFailed)
                      
          function addfavoriteComplete(res){
            
          }
        
          function addfavoriteFailed(err){
            
          }
      }
      
      function logcheck() {
        return $http.get('/api/user/addfavorite')
          .then(logcheckComplete)
          .catch(logcheckFailed)
                      
          function logcheckComplete(res){
            
          }
        
          function logcheckFailed(err){
            
          }
      }
      
      function login() {
        return $http.get('/api/user/addfavorite')
          .then(addfavoriteComplete)
          .catch(addfavoriteFailed)
                      
          function addfavoriteComplete(res){
            
          }
        
          function addfavoriteFailed(err){
            
          }
      }
      
      function register() {
        return $http.get('/api/user/register')
          .then(addfavoriteComplete)
          .catch(addfavoriteFailed)
                      
          function registerComplete(res){
            
          }
        
          function registerFailed(err){
            
          }
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    } // end userfactory function
  
  
  
  
  
  
  
  
  
}());