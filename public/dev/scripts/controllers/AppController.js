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
      // Put JQuery method in angular $timeout to put in digest queue, 
      // so the $scope is correctly updated before the notification pane is shown;
      $timeout(function(){
        $('body > div').addClass('is-blurred');
        $notification.fadeIn(250).delay(1500).fadeOut(500);
      },0);
      $timeout(function(){
        $('body > div').removeClass('is-blurred');
      }, 2250);
    });

}]);
