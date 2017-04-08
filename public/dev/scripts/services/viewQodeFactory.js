'use strict';

angular.module('app')
.constant('url', "/api/qodes/:id")
.service('viewQodeFactory', ['$resource', 'url', function($resource, url){
  
    return $resource(url,null,{'update':{method:'PUT'}});

}]);