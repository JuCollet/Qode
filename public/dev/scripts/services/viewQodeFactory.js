'use strict';

angular.module('app')
.service('viewQodeFactory', ['$resource', function($resource){
  
    const qodes = $resource("/api/qodes/:id",null,{
      upvote:{
        url:'/api/qodes/upvote/',
        method:'POST'
      }});
  
    return {
      qodes:qodes
    };

}]);