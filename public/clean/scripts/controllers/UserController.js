/*global $, angular, uiModule*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('UserController', UserController);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function UserController($rootScope, $state, userFactory){
      
      const vm = this;
      
      var getUserInfos; // Retrieve user data if he's logged in;
      
      vm.passwordValidation = passwordValidation; // Check if the password & password confirmation match;
      vm.login = login; // Login the user;
      vm.logout = logout; // Logout the user;
      vm.register = register; // Register the user;
      vm.viewQode = viewQode; // Go to the viewQode page to see selected Qode;
      vm.removeFromFavorites = removeFromFavorites; // Remove a Qode from the favorites array of the user;
      vm.deleteQode = deleteQode; // Delete a Qode form the database;
      vm.editQode = editQode; // Go to the editQode page to edit the selected Qode;
      vm.recovery = recovery; // Ask the server to send a recovery e-mail to reset password;
      vm.resetPassword = resetPassword; // Update the user password;
      
      vm.infos = {
        name : "",
        mail : "",
        password : "",
        confirmPassword : ""
      };
      
      
      (function getUserInfos(){
        if($rootScope.currentUser.isLogged === true){
          userFactory.getUser().then(function(res){
            vm.infos = res.data;
          });
        }
      }());
      
      
      function passwordValidation(){
        return vm.infos.password === vm.infos.confirmPassword;
      }
      
      
      function login(){
        
        const user = {
          mail: vm.infos.mail,
          password: vm.infos.password
        };
        
        userFactory.login(user).then(function success(res){
          $rootScope.currentUser = {
            isLogged:true,
            name:res.data.name,
          };
          $state.go('root.getqode', {encode:'encode'});
        }, function error(err){
          $rootScope.$broadcast('notification',{
            color:'red', 
            message: err.data.error.message, 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        });
        
      } // End login function;
      
      
      function logout(){
        userFactory.logout().then(function success(){
          $rootScope.currentUser = {
            isLogged:false,
            name:''
          };
        },function error(){
          $rootScope.$broadcast('notification',{
            color:'red', 
            message: "Please try again", 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        });
      } // End logout function;


      function register(){
        
        const user = {
          name: vm.infos.name,
          mail: vm.infos.mail,
          password : vm.infos.password,
          confirmPassword : vm.infos.confirmPassword
        };
        
        if(!passwordValidation()){
          $rootScope.$broadcast('notification',{
            color:'red', 
            message: "doesn't match", 
            title:'Passwords', 
            glyph:'fa fa-times'
          });
          return;
        }
        
        userFactory.register(user).then(function success(res){
          $rootScope.currentUser = {
            isLogged:true,
            name:res.data.name
          };
          $rootScope.$broadcast('notification',{
            color:'green', 
            message: "You're in, "+res.data.name, 
            title:'Welcome', 
            glyph:'fa fa-check'
          });
          $state.go('root.getqode', {encode:'encode'});
        }, function error(err){
            $rootScope.$broadcast('notification',{
              color:'red', 
              message: err.data.error.message, 
              title:'Oops...', 
              glyph:'fa fa-times'
            });
        });
        
      } // End register function;
      
      
      function viewQode(qode){
        $state.go('root.viewqode', {qode:qode});
      }
      
      
      function removeFromFavorites(qodeId,index){
        vm.infos.favorites.splice(index,1);
        userFactory.removeFromFavorites(qodeId);
      }
      
      
      function deleteQode(qodeId,index){
        vm.infos.myqodes.splice(index,1);
        userFactory.deleteQode(qodeId);
      }
      
      
      function editQode(qodeId){
        $state.go('root.editqode', {qode:qodeId});
      }
      
      
      function recovery(){
        userFactory.recovery(vm.infos.mail).then(function(){
          $rootScope.$broadcast('notification',{
            color:'green', 
            message: "Check your emails.", 
            title:'Alright !', 
            glyph:'fa fa-check'
          });
          $state.go('root.getqode');
        },function(err){
          $rootScope.$broadcast('notification',{
            color:'red', 
            message: err.data.error.message, 
            title:'Oops..', 
            glyph:'fa fa-times'
          });
        });
      } // End recovery function;
      
      
      function resetPassword(){
        userFactory.reset(vm.infos.confirmPassword).then(function(){
          $rootScope.$broadcast('notification',{
            color:'green', 
            message: "Password reset", 
            title:'Alright !', 
            glyph:'fa fa-check'
          });
          $state.go('root.getqode');
        });
      } // End reset password function;

    } // End UserController
    
    
}());