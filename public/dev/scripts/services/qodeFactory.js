'use strict';

angular.module('app')
.factory('qodeFactory', ['$resource', '$q', function($resource, $q){

  const dbConnection = $resource("/api/qodes/check/",null,{'check':{method:'POST'}});
  
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

  // This function return a promise because it use checkQodeIfAvailable function wich is asynchronous.
  // It pass a resolve function in it, wich returns the array of mock qodes with a unique one at index length-1.
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
    mockQodes: mockQodes,
    checkQodeIfAvailable: checkQodeIfAvailable
  };

}]);
