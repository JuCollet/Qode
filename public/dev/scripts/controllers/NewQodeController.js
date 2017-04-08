'use strict';

angular.module('app')

.controller('NewQodeController', ['$rootScope','$scope','$state','$timeout','newQodeFactory', function($rootScope,$scope,$state,$timeout,newQodeFactory){

  let card = function() {
        this.cardTitle = "";
        this.cardText = "";
        this.cardReferences = [];
        this.files = [];
        this.color = "default";
    };
    
  $scope.newQode = {
    qode : $state.params.qode,
    title : "",
    subtitle : "",
    description : "",
    cards : []
  };
  
  $scope.addNewCard = function(){
    $scope.newQode.cards.push(new card());
  };
  
  $scope.deleteCard = function(index){
    $('#card'+index+'>.card-delete').fadeOut(50,function(){
      $('#card'+index).slideUp(200, function(){
        $scope.newQode.cards.splice(parseInt(index),1);
        $scope.$apply();
      });
    });
  };
  
  $scope.postQode = function(){
    newQodeFactory.save($scope.newQode).$promise.then(function(){
      $rootScope.$broadcast('notification',{color:'green', message:'Your Qode is online', title:'Congratulations !', glyph:'fa fa-check'});
      $timeout(function(){
        $state.go('root.qode', {id:$scope.newQode.qode});
      },3000);
    });
  };
  
  $('.card-color-choice').click(function(e){
    const $el = $(this),
          $card = $(this).parents()[1];

    if($el.attr("data-isSelected") === "true") {
      $('.card-color-choice').removeAttr("data-isSelected");
      $($card).attr("data-color","default");
    } else {
      $('.card-color-choice').removeAttr("data-isSelected");
      $el.attr("data-isSelected",true);
      $($card).attr("data-color",e.currentTarget.id.substr(11));
    }

  });

}]);