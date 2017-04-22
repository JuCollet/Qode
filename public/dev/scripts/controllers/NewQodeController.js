'use strict';

angular.module('app')

.controller('NewQodeController', ['$rootScope','$scope','$state','$timeout','newQodeFactory', function($rootScope,$scope,$state,$timeout,newQodeFactory){
   
  let actualCardColor = 0;
  const cardColors = ['default','orange','yellow','green','blue','purple'];
  
  let card = function(color) {
        this.cardTitle = "";
        this.cardText = "";
        this.cardReferences = [];
        this.color = color;
  };
  
  let cardReference = function(name, url) {
    this.text = name;
    this.link = url;
  };
  
  let file = function(name, path, type) {
    this.fileName = name;
    this.filePath = path;
    this.fileType = type;
  };
  
  const addFileToScope = function(name, path, type) {
    $scope.newQode.files.push(new file(name, path, type));
  };
  
  $scope.newReference = {
    url: "",
    name: ""
  };
  
  $scope.removeFile = function(index){
    $scope.newQode.files.splice(index,1);  
  };
  
  $scope.removeReference = function(cardIndex,refIndex){
    $scope.newQode.cards[cardIndex].cardReferences.splice(refIndex,1);
  };
  
  newQodeFactory.dbOperations.edit({qode:$state.params.qode}).$promise.then(function success(qode){
    $scope.newQode = qode;
  }, function error(err){
    $state.go('root.encode');
    $rootScope.$broadcast('notification',{
      color:'red', 
      message:err.data.error.message, 
      title:'Oops...', 
      glyph:'fa fa-times'
    });
  });
  
  /*
    $scope.newQode = {
    qode : $state.params.qode,
    title : "",
    subtitle : "",
    description : "",
    cards : [],
    files : []
  };
  */
  
  $scope.confirm = false;
  
  $scope.confirmToggle = function() {
    $scope.confirm = !$scope.confirm;
  };
  
  $scope.addNewCard = function(){
    actualCardColor++;
    if(actualCardColor === cardColors.length){actualCardColor = 1;}
    $scope.newQode.cards.push(new card(cardColors[actualCardColor]));
  };
  
  const testValidUrl = function(stringToTest){
    if(stringToTest.substring(7,0) === "http://" || stringToTest.substring(8,0) === "https://" || stringToTest.substring(4,0) === "www."){
      return true;
    } else {
      $rootScope.$broadcast('notification',{
        color:'red', 
        message:'No valid url found', 
        title:'Oops...', 
        glyph:'fa fa-times'
      });
      return false;
    }
  };
    
  $scope.addReference = function(i){
    if(!testValidUrl($scope.newReference.url)){return;}
    if($scope.newReference.url !== "" && $scope.newReference.name !== "") {
      $scope.newQode.cards[i].cardReferences.push(new cardReference($scope.newReference.name, $scope.newReference.url));
      $scope.newReference = {url:"",name:""};
      return;
    } else if($scope.newReference.url !== "") {
      $scope.newQode.cards[i].cardReferences.push(new cardReference($scope.newReference.url, $scope.newReference.url));
      $scope.newReference = {url:"",name:""};
      return;
    } else {
      $rootScope.$broadcast('notification',{
        color:'red', 
        message:'No reference to add', 
        title:'Oops...', 
        glyph:'fa fa-times'
      });
    }
    
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
        title:'Oops...', 
        glyph:'fa fa-times'
      });
      $scope.confirmToggle();
      return;
    } else {
      newQodeFactory.dbOperations.save({id:$scope.newQode.qode},$scope.newQode).$promise.then(function(){
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
  
  document.getElementById("fileUpload").onchange = function(){
    if($scope.newQode.files.length < 5){
      let files = document.getElementById("fileUpload").files;
      let file = files[0];
      if(file === null || file === undefined){return;}  // Standard is : if (variable == null) though, to check both null & undefined;
      else {newQodeFactory.uploadButtonStateChange.disable();}
      if(file.size < 10485760) { // 10485760 octets = 10mb
        newQodeFactory.getSignedRequest(file, addFileToScope);
      } else {
        $rootScope.$broadcast('notification',{
          color:'red', 
          title:'Oops...', 
          message:'This file is too big', 
          glyph:'fa fa-tachometer'
        });
        newQodeFactory.uploadButtonStateChange.activate();
      }      
    } else {
        $rootScope.$broadcast('notification',{
          color:'red', 
          message:'5 files maximum', 
          title:'Sorry...', 
          glyph:'fa fa-times'
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