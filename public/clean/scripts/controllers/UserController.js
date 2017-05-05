'use strict';

angular.module('app')
  .controller('UserController', ['$rootScope', '$scope', '$state', 'userFactory', function($rootScope, $scope, $state, userFactory){
    
    $scope.name = "";
    $scope.mail = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    
    $scope.passwordValidation = function(){
      return $scope.password === $scope.confirmPassword;
    };
    
    $scope.login = function(){
      const user = {
        mail: $scope.mail,
        password: $scope.password
      };
      
      userFactory.login(user).then(function success(res){
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
        
    $scope.logout = function(){
     userFactory.logout().then(function success(){
        $rootScope.isLogged = {
          log:false,
          name:'',
          favorites:[]
        };
     },function error(){
        $rootScope.$broadcast('notification',{
          color:'red', 
          message: "Can't log out", 
          title:'Oops...', 
          glyph:'fa fa-times'
        });
     });
    }; // End logout function
    
    $scope.register = function(){
      const user = {
        name: $scope.name,
        mail: $scope.mail,
        password : $scope.password,
        confirmPassword : $scope.confirmPassword
      };
      
      if(user.password !== user.confirmPassword){
        $rootScope.$broadcast('notification',{
          color:'red', 
          message: "doesn't match", 
          title:'Passwords', 
          glyph:'fa fa-times'
        });
        return;
      }
      
      userFactory.register(user).then(function success(res){
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
    
    if($rootScope.currentUser.isLogged === true){
      $scope.data = userFactory.getUser().then(function(res){
        $scope.user = res;
      });
    }
    
    $scope.viewQode = function(qode){
      $state.go('root.qode', {id:qode});
    };

    $scope.removeFromFavorites = function(qodeId,index){
      $scope.user.favorites.splice(index,1);
      userFactory.user.removeFromFavorites({favId:qodeId});
    };
    
    $scope.deleteQode = function(qodeId,index){
      $scope.user.myqodes.splice(index,1);
      userFactory.user.deleteQode({qodeId:qodeId});
    };
    
    $scope.editQode = function(qodeId){
      $state.go('root.newQode', {qode:qodeId});
    };
    
    $scope.recovery = function(){
      userFactory.recovery($scope.mail).then(function(){
        $rootScope.$broadcast('notification',{
          color:'green', 
          message: "Check your emails.", 
          title:'Alright !', 
          glyph:'fa fa-check'
        });
        $state.go('root.encode');
      },function(err){
        $rootScope.$broadcast('notification',{
          color:'red', 
          message: err.data.error.message, 
          title:'Oops..', 
          glyph:'fa fa-times'
        });
      });
    };
    
    $scope.resetPassword = function(){
      userFactory.user.reset($scope.confirmPassword).then(function(){
        $rootScope.$broadcast('notification',{
          color:'green', 
          message: "Password reset", 
          title:'Alright !', 
          glyph:'fa fa-check'
        });
        $state.go('root.encode');
      });
    };
    
  }]);