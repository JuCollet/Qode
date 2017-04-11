'use strict';

angular.module('app')

  .controller('AppController', ['$scope', '$timeout', function($scope, $timeout){

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
      $('body > div').addClass('is-blurred');
      $scope.notificationColor = args.color;
      $scope.notificationMessageTitle = args.title;
      $scope.notificationMessage = args.message;
      $scope.notificationGlyph = args.glyph;
      $('notification').fadeIn(250).delay(1500).fadeOut(500);
      $timeout(function(){
        $('body > div').removeClass('is-blurred');
      }, 2250);
    });

}]);
