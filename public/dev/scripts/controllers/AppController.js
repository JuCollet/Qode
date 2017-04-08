'use strict';

angular.module('app')

  .controller('AppController', ['$scope', '$timeout', function($scope, $timeout){

    $scope.notificationColor = "";
    $scope.notificationMessageTitle = "";
    $scope.notificationMessage = "";
    $scope.notificationGlyph = "";
    $scope.notificationVisible = false;
    
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
      $scope.notificationVisible = true;
      $timeout(function(){
        $scope.notificationVisible = false;
      },3000);
      $timeout(function(){
        $('body > div').removeClass('is-blurred');
      },3100);
    });

}]);
