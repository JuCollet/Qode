'use strict';

angular.module('app')

  .controller('AppController', ['$scope', '$timeout', function($scope, $timeout){

    const $notification = $('notification');
    $scope.notificationColor = "";
    $scope.notificationMessageTitle = "";
    $scope.notificationMessage = "";
    $scope.notificationGlyph = "";
    
    // Initialize tooltips
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    //Système de notification;
    $scope.$on('notification', function(event, args) {
      $scope.notificationColor = args.color;
      $scope.notificationMessageTitle = args.title;
      $scope.notificationMessage = args.message;
      $scope.notificationGlyph = args.glyph;
      // Set JQuery method in angular $applyAsync method to put in $digest queue, 
      // so the $scope is correctly updated before the notification pane is shown;
      // This is the new evlSync method (angular > 1.2) explained here :
      // https://www.bennadel.com/blog/2605-scope-evalasync-vs-timeout-in-angularjs.htm
      $scope.$applyAsync(function(){
        $('body > div').addClass('is-blurred');
        $notification.fadeIn(250).delay(1500).fadeOut(500);
      });
      $timeout(function(){
        $('body > div').removeClass('is-blurred');
      }, 2250);
    });

}]);
