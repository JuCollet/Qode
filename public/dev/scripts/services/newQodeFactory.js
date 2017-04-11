'use strict';

angular.module('app')
  .constant('url', "/api/qodes/")
  .factory('newQodeFactory', ['$resource', '$http', 'url', function($resource, $http, url){
  
    const dbOperations = $resource(url,null,{'save':{method:'POST'}}); 
    
    const _uploadFile = function(file, signedRequest, url){
      $http({
        method: 'PUT',
        url: signedRequest,
        data:file
      }).then(function successCallback(res){
        console.log(res);
      }, function errorCallback(res){
        console.log(res);
      });
    };
  
    const getSignedRequest = function(file){
      $http({
        method: 'GET',
        url: `/sign-s3?file-name=${file.name}&file-type=${file.type}`
        }).then(function successCallback(res) {
          _uploadFile(file, res.data.signedRequest, res.data.url);
        }, function errorCallback(res) {
          console.log(res);
      });
    };
    
    return {
      dbOperations: dbOperations,
      getSignedRequest: getSignedRequest
    };

}]);