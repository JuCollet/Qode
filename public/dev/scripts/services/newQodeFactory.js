'use strict';

angular.module('app')
  .constant('url', "/api/qodes/")
  .factory('newQodeFactory', ['$rootScope','$resource', '$http', 'url', function($rootScope, $resource, $http, url){
  
    const dbOperations = $resource(url,null,{'save':{method:'POST'}}); 
    
    const $ulButton = $('#ulButton'),
          $ulButtonGlyph = $('#ulButton i'),
          $ulButtonInput = $('#ulButton input');
    
    const uploadButtonStateChange = {
      activate : function(){
        $ulButton.removeClass('is-light');
        $ulButtonGlyph.removeClass('fa-spinner fa-spin').addClass('fa-plus');
        $ulButtonInput.attr('disabled', false);
      },
      disable : function(){
        $ulButton.addClass('is-light');
        $ulButtonGlyph.removeClass('fa-plus').addClass('fa-spinner fa-spin');
        $ulButtonInput.attr('disabled', true);
      }
    };
    
    const _uploadFile = function(file, signedRequest, url){
      $http({
        method: 'PUT',
        url: signedRequest,
        data:file
      }).then(function successCallback(){
        $rootScope.$broadcast('notification',{
          color:'green', 
          title:'Success !', 
          message:'Your file is online.', 
          glyph:'fa fa-check'
        });
        uploadButtonStateChange.activate();
      }, function errorCallback(){
        $rootScope.$broadcast('notification',{
          color:'red', 
          title:'Oops...', 
          message:'Try again later', 
          glyph:'fa fa-times'
        });
        uploadButtonStateChange.activate();
      });
    };
  
    const getSignedRequest = function(file){
      $http({
        method: 'GET',
        url: `/sign-s3?file-name=${file.name}&file-type=${file.type}`
        }).then(function successCallback(res) {
          _uploadFile(file, res.data.signedRequest, res.data.url);
        }, function errorCallback() {
          $rootScope.$broadcast('notification',{
            color:'red', 
            title:'Oops...', 
            message:'Try again later', 
            glyph:'fa fa-times'
          });
        uploadButtonStateChange.activate();
      });
    };
    
    return {
      dbOperations: dbOperations,
      getSignedRequest: getSignedRequest,
      uploadButtonStateChange: uploadButtonStateChange
    };

}]);