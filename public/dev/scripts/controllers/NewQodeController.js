'use strict';

angular.module('app')

.controller('NewQodeController', ['$rootScope','$scope','$state','$timeout','newQodeFactory', function($rootScope,$scope,$state,$timeout,newQodeFactory){

  (function(){
    document.getElementById("file-input").onchange = function(){
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file === null){
      return;
    }
    newQodeFactory.getSignedRequest(file);
    };
  })();
  
  $scope.newQode = {
    qode : $state.params.qode,
    title : "",
    subtitle : "",
    description : "",
    cards : []
  };
  
  let card = function() {
        this.cardTitle = "";
        this.cardText = "";
        this.cardReferences = [{
          text : "Test de référence",
          link : null
        }];
        this.files = [];
        this.color = "default";
  };
  
  let cardReference = function() {
    this.text = "";
    this.link = "";
  };
  
  let file = function() {
    this.fileText = "";
    this.filePath = "";
    this.fileType = "";
  };
  
  $scope.addNewCard = function(){
    $scope.newQode.cards.push(new card());
  };
  
  $scope.addFile = function(i){
    $scope.newQode.cards[i].files.push(new file());
  };
  
  $scope.addReference = function(i){
    $scope.newQode.cards[i].cardReferences.push(new cardReference());
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
    if($scope.newQode.title.length < 2) {
      $rootScope.$broadcast('notification',{
        color:'red', 
        message:'You forgot the title', 
        title:'Ooops...', 
        glyph:'fa fa-times'
      });
      return;
    } else {
      newQodeFactory.dbOperations.save($scope.newQode).$promise.then(function(){
        $rootScope.$broadcast('notification',{
          color:'green', 
          message:'Your Qode is online', 
          title:'Congratulations !', 
          glyph:'fa fa-check'
        });
        $timeout(function(){
          $state.go('root.qode', {id:$scope.newQode.qode});
        },3000);
      });
    }
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