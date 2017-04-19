'use strict';

angular.module('app')
  .factory('userFactory', ['$resource', function($resource){
    
    const login = $resource("/user/login",null,{'post':{method:'POST'}});
    const logout = $resource("/user/logout",null,{'get':{method:'GET'}});
    const user = $resource("/user",null,{'get':{method:'GET'}, 'post':{method:'POST'}, 'put':{method:'PUT'}});

    return {
      login:login,
      logout:logout,
      user: user
    };
    
  }]);