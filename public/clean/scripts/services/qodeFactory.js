/*global $, angular*/

(function(){
  
  'use strict';

  angular.module('app')
    
    .factory('qodeFactory', qodeFactory);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function qodeFactory($http, $q){
    
      var getQode = function(qode){return $http.get('/api/qodes/'+qode);},
          upVote = function(qodeId){return $http.post('/api/qodes/upvote/', {toUpvote:qodeId});},
          checkIfAvailable = function(qode){return $http.post('/api/qodes/check/', {qode:qode});},
          addToFavorites = function(qodeId){return $http.put('/user/addtofavorites/', {favId:qodeId});},
          doCheckIfAvailable, // Check if qode provided is already taken or not (qode,succesCb,errorCb);
          makeMockQodes; // Return a promise with an array of X qodes which the last one is unique in DB (X);
      
      doCheckIfAvailable = function(qodeToCheck, successCb, errorCb){
        checkIfAvailable(qodeToCheck)
          .then(function successCallback(res){
            if(res.data.isAvailable){
              successCb();
            } else {
              errorCb();
            }
          }, function errorCallback(err){
            return err;
        });
      };
      
      makeMockQodes = function(nbrMocks = 5){

        const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        // This function return a promise because it use checkQodeIfAvailable function wich is asynchronous.
        // It pass a resolve function in it, wich returns the array of mock qodes with a unique one at index length-1.
          return $q(function(resolve, reject){
            let qodeArray = [];
            for(let i = 0; i < nbrMocks; i++) {
              let qode = "";
              for(let j = 0; j < 5; j++){
                if(j<2) {
                  qode += alphabet[Math.floor(Math.random()*24)];
                } else {
                  qode += Math.floor(Math.random()*10);
                }
              }
              qodeArray.push(qode);
            }
          
            doCheckIfAvailable(qodeArray[nbrMocks-1],function(){
              resolve(qodeArray);
            }, function(){
              reject('error');
            });
          });
      };

      return {
        getQode : getQode,
        upVote : upVote,
        addToFavorites : addToFavorites,
        doCheckIfAvailable : doCheckIfAvailable,
        makeMockQodes : makeMockQodes
      };

    } // End qodeFactory
    
}());