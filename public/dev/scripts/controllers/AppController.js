'use strict';

angular.module('app')

.controller('AppController', ['$scope', function($scope){

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
  
  /*
  //Système de notification;
  $scope.$on('notification', function(event, args) {
      // Utiliser cette syntaxe pour broadcaster les notifications à afficher :
      $rootScope.$broadcast('notification',{type:'Error',message:'Erreur de connexion'});
  });
  */
  
  

}]);
