/*global $, angular*/

(function(){
  
  'use strict';

  angular.module('app')
  
    .controller('AppController', AppController);
    
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function AppController($rootScope, $timeout, userFactory){
      
      var vm = this;
      var checkCurrentUser; // Check if user is logged or not;
      var backButtonRedirection; // Change back button destination depending on where the user came from;
      var notificationListener; // Listen for notifications to be displayed;
      
      vm.$notification = $('notification');
      vm.backButtonDestination = "root.encode";
      vm.notification = {
        color:"",
        messageTitle:"",
        message:"",
        glyph:""
      };
      
      $rootScope.currentUser = {
        isLogged:false,
        name:""
      };
      
      checkCurrentUser = (function(){
        userFactory.isLogged().then(function(res){
          if(res.isLogged !== undefined && res.isLogged.log === true){
            $rootScope.currentUser.isLogged = true;
            $rootScope.currentUser.name = res.isLogged.name;
          } else {
            $rootScope.currentUser.isLogged = false;
            $rootScope.currentUser.name = "";
          }
        }, function(err){
          if(err){throw err;}
        });        
      }());

      backButtonRedirection = (function(){
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
          if(from.name !== null && from.name !== undefined){
            if(from.name === 'root.myaccount'){
              vm.backButtonDestination = 'root.myaccount';
            } else if(from.name === 'root.login') {
              vm.backButtonDestination = 'root.login';
            } else if(from.name === 'root.decode') {
              vm.backButtonDestination = 'root.decode({encode:"decode"})';
            } else {
              vm.backButtonDestination = 'root.encode';
            }
          }
        });
      }());
      
      notificationListener = (function(){
        $rootScope.$on('notification', function(event, args) {
          vm.notification.color = args.color;
          vm.notification.messageTitle = args.title;
          vm.notification.message = args.message;
          vm.notification.glyph = args.glyph;
          
          // Set JQuery method in angular $applyAsync method to put in $digest queue, 
          // so the $scope is correctly updated before the notification pane is shown;
          // This is the new evlSync method (angular > 1.2) explained here :
          // https://www.bennadel.com/blog/2605-scope-evalasync-vs-timeout-in-angularjs.htm
          vm.$applyAsync(function(){
            $('body > div').addClass('is-blurred');
            vm.$notification.fadeIn(250).delay(1500).fadeOut(500);
          });
          $timeout(function(){
            $('body > div').removeClass('is-blurred');
          }, 2250);
        });
      }());
    }
}());