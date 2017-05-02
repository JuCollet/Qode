'use strict';

angular.module('mobile')


.factory('qodeFactory', ['$http', function($http){

const getQode = function(){return $http.get('/api/qodes/:id');};

return {
  getQode : getQode
};

}]);