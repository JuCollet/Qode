'use strict';

angular.module('app')
  .controller('UserController', ['$rootScope', '$scope', 'userFactory', '$state', function($rootScope, $scope, userFactory, $state){
    
    $scope.name = "";
    $scope.mail = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    
    $scope.login = function(){
      const data = {
        mail: $scope.mail,
        password: $scope.password
      };
      
      userFactory.login.post(data).$promise.then(function success(res){
        $rootScope.isLogged = {
          log:true,
          name:res.name,
          favorites:res.favorites
        };
        $state.go('root.encode', {encode:'encode'});
      }, function error(err){
        $rootScope.$broadcast('notification',{
          color:'red', 
          message: err.data.error.message, 
          title:'Oops...', 
          glyph:'fa fa-times'
        });
      });
      
    }; // End login function
    
    $scope.register = function(){
      const data = {
        name: $scope.name,
        mail: $scope.mail,
        password : $scope.password,
        confirmPassword : $scope.confirmPassword
      };
      
      if(data.password !== data.confirmPassword){
        $rootScope.$broadcast('notification',{
          color:'red', 
          message: "Passwords doesn't match", 
          title:'Oops', 
          glyph:'fa fa-times'
        });
        return;
      }
      
      userFactory.user.post(data).$promise.then(function success(res){
        $rootScope.isLogged = {
          log:true,
          name:res.name,
          favorites:res.favorites
        };
        $rootScope.$broadcast('notification',{
          color:'green', 
          message: "You're in, "+res.name, 
          title:'Welcome', 
          glyph:'fa fa-check'
        });
        $state.go('root.encode', {encode:'encode'});
      }, function error(err){
          $rootScope.$broadcast('notification',{
            color:'red', 
            message: err.data.error.message, 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        
      });
    }; // End register function
    
    $scope.data = userFactory.user.get().$promise
    .then((res)=>{
      $scope.user = res;
    });
    
    $scope.viewQode = function(qode){
      $state.go('root.qode', {id:qode});
    };
    
  }]);