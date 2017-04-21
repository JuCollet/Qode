'use strict';

angular.module('app')
  .factory('userFactory', ['$resource', function($resource){
    
    const user = $resource("/user", null, {
      register:{
        method:'POST'
      },
      addToFavorites:{
        url:'/user/addtofavorites',
        method:'POST'
      },
      removeFromFavorites:{
        url:'/user/removefromfavorites',
        method:'POST'
      },
      deleteQode:{
        url:'/user/deleteqode',
        method:'POST'
      },
      login:{
        url:'/user/login',
        method:'POST'
      },
      logout:{
        url:'/user/logout',
        method:'GET'
      }
    });
    
    return {
      user: user
    };
    
  }]);