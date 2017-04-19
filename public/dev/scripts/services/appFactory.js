'use strict';

angular.module('app')
  .factory('appFactory', ['$resource', function($resource){
    
    const isLogged = $resource("/user/logcheck",null,{'check':{method:'GET'}});

    return {
      isLogged:isLogged
    };
        
  }]);