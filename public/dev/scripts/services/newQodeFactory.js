'use strict';

angular.module('app')
  .constant('url', "/api/qodes/")
  .service('newQodeFactory', ['$resource', 'url', function($resource, url){
  
    return $resource(url,null,{'save':{method:'POST'}});

}]);