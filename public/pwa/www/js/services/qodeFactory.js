'use strict';

angular.module('mobile')


.factory('qodeFactory', ['$http', function($http){

    const getQode = function(qode){return $http.get('/api/qodes/'+qode);};
    
    return {
      getQode : getQode
    };

}]);