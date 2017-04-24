'use strict';

angular.module('app')
  .factory('userFactory', ['$resource', function($resource){
    
    const user = $resource("/user", null, {
      addToFavorites:{
        url:'/user/addtofavorites',
        method:'POST'
      },
      deleteQode:{
        url:'/user/deleteqode',
        method:'POST'
      },
      isLogged:{
        url:'/user/islogged',
        method:'GET'
      },
      login:{
        url:'/user/login',
        method:'POST'
      },
      logout:{
        url:'/user/logout',
        method:'GET'
      },
      register:{
        method:'POST'
      },
      removeFromFavorites:{
        url:'/user/removefromfavorites',
        method:'POST'
      }
    });
    
    return {
      user: user
    };
    
  }]);