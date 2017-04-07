'use strict';

angular.module('app')

.factory('qodeFactory', function(){

  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  let qodeArray = [],
      qode = "";

  const mockQodes = function(nbrMocks = 3){
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
    return qodeArray;
  };

  return {
    mockQodes: mockQodes
  };

});
