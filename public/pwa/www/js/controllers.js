'use strict';

angular.module('mobile')

.controller('MobileController', ['$scope', '$rootScope', 'userFactory', 'qodeFactory', function($scope, $rootScope, userFactory, qodeFactory) {

  $rootScope.logged = {
    log: false,
    name: ""
  };
  
  userFactory.isLogged().then(function(res){
    if(res.data.isLogged !== undefined && res.data.isLogged.log === true){
      $rootScope.logged.log = true;
      $rootScope.logged.name = res.data.isLogged.name;
    } else {
      $rootScope.logged.log = false;
    }
  },function(err){
    if(err){throw err;}
  });

    
}]);
