'use strict';

angular.module('app')
.constant('url', "http://qode-jucollet469715.codeanyapp.com:8080/api/qodemock")
.service('qodeViewFactory', ['$resource', 'url', function($resource, url){

    return $resource(url,null,{'update':{method:'PUT'}});

}]);
