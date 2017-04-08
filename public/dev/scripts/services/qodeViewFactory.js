'use strict';

angular.module('app')
.constant('url', "http://qode-jucollet469715.codeanyapp.com:5000/api/qodes/:id")
.service('qodeViewFactory', ['$resource', 'url', function($resource, url){
  
    return $resource(url,null,{'update':{method:'PUT'}});

}]);