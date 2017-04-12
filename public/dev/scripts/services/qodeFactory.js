'use strict';

angular.module('app')
.constant('url', "/api/qodes/check/")
.factory('qodeFactory', ['$resource', 'url', '$q', function($resource, url, $q){

  const dbConnection = $resource(url,null,{'check':{method:'POST'}});
  
  const checkQodeIfAvailable = function(qodeToCheck, success, error){
    dbConnection.check({qode:qodeToCheck}).$promise
      .then(function successCallback(res){
        if(res.isAvailable){
          success();
        } else {
          error();
        }
      }, function errorCallback(err){
        return err;
    });
  };
  
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  let qodeArray = [],
      qode = "";

  const mockQodes = function(nbrMocks = 3){
    return $q(function(resolve, reject){
      qodeArray = [];
      for(let i = 0; i < nbrMocks; i++) {
        qode = "";
        for(let j = 0; j < 5; j++){
          if(j<2) {
            qode += alphabet[Math.floor(Math.random()*24)];
          } else {
            qode += Math.floor(Math.random()*10);
          }
        }
        qodeArray.push(qode);
      }
    
      checkQodeIfAvailable(qodeArray[nbrMocks-1],function(){
        resolve(qodeArray);
      }, function(){
        reject('error');
      });
      
    });
  };

  return {
    mockQodes: mockQodes
  };

}]);
