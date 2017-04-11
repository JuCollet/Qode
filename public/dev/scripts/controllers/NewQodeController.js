'use strict';

angular.module('app')

.controller('NewQodeController', ['$rootScope','$scope','$state','$timeout','newQodeFactory', function($rootScope,$scope,$state,$timeout,newQodeFactory){
  
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
  
  (function(){
    document.getElementById("fileUpload").onchange = function(){
    const files = document.getElementById("fileUpload").files;
    const file = files[0];
    console.log(file.size);
    console.log(file);
    if(file === null){return;}
    else if(file.size < 1024000) { // 10485760 octets = 10mb
      newQodeFactory.getSignedRequest(file);
    } else {
      alert(file.name + ' est un fichier trop lourd');
    }
    //$scope.newQode.cards[index].files.push(new file());
    };
  })();
  
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
        }, 3000);
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