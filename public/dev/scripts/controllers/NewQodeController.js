'use strict';

angular.module('app')

.controller('NewQodeController', ['$rootScope','$scope', function($rootScope,$scope){

  let card = function() {
        this.cardTitle = "card title ok";
        this.cardText = "card text ok";
        this.cardReferences = "Reference ok";
        this.files = "";
        this.color = "default";
    };
  
  $scope.newQode = {
    qode : "NG666",
    title : "title ok",
    subtitle : "subtitle ok",
    description : "description ok",
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