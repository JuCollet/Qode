/*global $, angular, uiModule, uploadModule*/

(function(){
  
  'use strict';
  
  angular.module('app')
  
    .controller('QodeEditController', QodeEditController);
  
    /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
    function QodeEditController($state, $rootScope, $scope, $http, qodeFactory, $timeout){
     
      const vm = this;
      
      var addFile; // Add a file to the Qode page;
      var aggregateQode; // Aggregate current data in database for this Qode page;
      var uploadFile; // Upload a file and add it to the Qode page;
      var cardColorSelector; // Select the background color of the selected Card;
      vm.removeFile = removeFile; // Remove a file reference from the Qode page;
      vm.removeReference = removeReference; // Remove a reference link from the card;
      vm.confirmToggle = confirmToggle; // Show or hide the confirmation button to save Qode page;
      vm.confirm = false; // Confirm buttons are hided by default;
      vm.addNewCard = addNewCard; // Add a new card to the Qode page;
      vm.addReference = addReference; // Add a new reference (external link) to current card;
      vm.deleteCard = deleteCard; // Delete selected card from Qode page;
      vm.postQode = postQode; // Save the current Qode by posting it to the db and exit the page;

      const cardColors = ['default','orange','yellow','green','blue','purple'];

      let actualCardColor = 0;
      
      vm.newReference = {
        url: "",
        name: ""
      };
      
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
      
      addFile = function(name, path, type) {
        vm.newQode.files.push(new file(name, path, type));
      };
    
      function removeFile(index){
        vm.newQode.files.splice(index,1);  
      }
     
      function removeReference(cardIndex,refIndex){
        vm.newQode.cards[cardIndex].cardReferences.splice(refIndex,1);
      }
      
      aggregateQode = (function(){
        qodeFactory.getQodeToEdit($state.params.qode).then(function success(qode){
          vm.newQode = qode.data;
        }, function error(err){
          $state.go('root.getqode');
          $rootScope.$broadcast('notification',{
            color:'red', 
            message:err.data.error.message, 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        });
      }());
    
      function confirmToggle() {
        vm.confirm = !vm.confirm;
      }
      
      function addNewCard(){
        actualCardColor++;
        if(actualCardColor === cardColors.length){actualCardColor = 1;}
        vm.newQode.cards.push(new card(cardColors[actualCardColor]));
      }
      
      function addReference(i){
        if(!uiModule.testValidUrl(vm.newReference.url, $rootScope)){return;}
        if(vm.newReference.url !== "" && vm.newReference.name !== "") {
          vm.newQode.cards[i].cardReferences.push(new cardReference(vm.newReference.name, vm.newReference.url));
          vm.newReference = {url:"",name:""};
          return;
        } else if(vm.newReference.url !== "") {
          vm.newQode.cards[i].cardReferences.push(new cardReference(vm.newReference.url, vm.newReference.url));
          vm.newReference = {url:"",name:""};
          return;
        } else {
          $rootScope.$broadcast('notification',{
            color:'red', 
            message:'No reference to add', 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
        }
      } // End addReference;
      
      function deleteCard(index){
        $('#card'+index+'>.card-delete').fadeOut(50,function(){
          $('#card'+index).slideUp(200, function(){
            vm.newQode.cards.splice(parseInt(index, 10),1);
            $scope.$apply();
          });
        });
      }

      function postQode(){
        if(vm.newQode.title === undefined || vm.newQode.title.length < 2) {
          $rootScope.$broadcast('notification',{
            color:'red', 
            message:'You forgot the title', 
            title:'Oops...', 
            glyph:'fa fa-times'
          });
          vm.confirmToggle();
          return;
        } else {
          qodeFactory.saveQode(vm.newQode._id,vm.newQode).then(function(){
            $rootScope.$broadcast('notification',{
              color:'green', 
              message:'Your Qode is online', 
              title:'Congratulations !', 
              glyph:'fa fa-check'
            });
            $timeout(function(){
              $state.go('root.viewqode', {qode:vm.newQode.qode});
            }, 1500);
          });
        }
      }
      
      (function uploadFile(){
        document.getElementById("fileUpload").onchange = function(){
          if(vm.newQode.files.length < 5){
            uploadModule.uploadFile($rootScope, $http, addFile);   
          } else {
            $rootScope.$broadcast('notification',{
              color:'red', 
              message:'5 files maximum', 
              title:'Sorry...', 
              glyph:'fa fa-times'
            });
          }
        };
      }());
      
      (function cardColorSelector(){
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
      }());
      
    } // End QodeEditController;
  
}());