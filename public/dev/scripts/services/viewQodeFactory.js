'use strict';

angular.module('app')
.service('viewQodeFactory', ['$resource', function($resource){
  
    return $resource("/api/qodes/:id",null,{'update':{method:'PUT'}});

}]);