'use strict';

angular.module('mobile')


.factory('qodeFactory', ['$http', function($http){

    const getQode = function(qode){return $http.get('/api/qodes/'+qode);},
          upVote = function(qodeId){return $http.post('/api/qodes/upvote/', {toUpvote:qodeId});},
          addToFavorites = function(qodeId){return $http.put('/user/addtofavorites/', {favId:qodeId});};
    
    return {
      getQode : getQode,
      upVote : upVote,
      addToFavorites : addToFavorites
    };

}]);