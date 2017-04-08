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

    // Auto-expand textarea from http://codepen.io/vsync/pen/frudD
    $(document)
      .one('focus.autoExpand', 'textarea.autoExpand', function(){
          var savedValue = this.value;
          this.value = '';
          this.baseScrollHeight = this.scrollHeight;
          this.value = savedValue;
      })
      .on('input.autoExpand', 'textarea.autoExpand', function(){
          var minRows = this.getAttribute('data-min-rows') | 0, rows;
          this.rows = minRows;
          rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 24);
          this.rows = minRows + rows;
      });

    //Système de notification;
    $scope.$on('notification', function(event, args) {
      $scope.notificationColor = args.color;
      $scope.notificationMessageTitle = args.title;
      $scope.notificationMessage = args.message;
      $scope.notificationGlyph = args.glyph;
      $scope.notificationVisible = true;
      $timeout(function(){
        $scope.notificationVisible = false;
      },3000);
    });

}]);
