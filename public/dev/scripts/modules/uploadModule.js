/*global $*/

'use strict';

const uploadModule = (function(){
    
    var uploadFile; // Handling file upload function;
    var _uploadButtonStateChange; // Set of two functions to change the appareance of the upload button during uploading;
    var _getSignedRequest; // Get signed request form AWS to upload the selected file;
    var _uploadFile; // Upload the file to AWS S3;
    
    uploadFile = function($rootScope, $http, addFile){
        
        let file = document.getElementById("fileUpload").files[0];
        
        if(file === null || file === undefined){return;}  // Standard is : if (variable == null) though, to check both null & undefined;
        else {_uploadButtonStateChange.disable();}
        
        if(file.size < 10485760) { // 10485760 octets = 10mb
            _getSignedRequest(file, addFile, $rootScope, $http);
        } else {
          $rootScope.$broadcast('notification',{
            color:'red', 
            title:'Oops...', 
            message:'This file is too big', 
            glyph:'fa fa-tachometer'
          });
          _uploadButtonStateChange.activate();
        }   

    }; // End send
    
    _uploadFile = function(file, signedRequest, url, cb, $rootScope, $http){
      $http({
        method: 'PUT',
        url: signedRequest,
        data:file
      }).then(function successCallback(res){
        let shortName;
        const nameLength = 20;
        if(file.name.length > nameLength){
          shortName = file.name.split('');
          shortName.splice(nameLength, shortName.length-nameLength);
          shortName.push('...');
          shortName = shortName.join('');
        }
        const fileUrl = res.config.url.split('?')[0];
        cb(shortName || file.name, fileUrl, file.type.split('/')[1].toUpperCase());
        _uploadButtonStateChange.activate();
      }, function errorCallback(){
        $rootScope.$broadcast('notification',{
          color:'red', 
          title:'Oops...', 
          message:'Try again later', 
          glyph:'fa fa-times'
        });
        _uploadButtonStateChange.activate();
      });
  
    }; // End _uploadFile;
    
    
    _getSignedRequest = function(file, cb, $rootScope, $http){
      $http({
        method: 'GET',
        url: `/sign-s3?file-name=${file.name}&file-type=${file.type}`
        }).then(function successCallback(res) {
          _uploadFile(file, res.data.signedRequest, res.data.url, cb, $rootScope, $http);
        }, function errorCallback() {
          $rootScope.$broadcast('notification',{
            color:'red', 
            title:'Oops...', 
            message:'Try again later', 
            glyph:'fa fa-times'
          });
        _uploadButtonStateChange.activate();
      });
    };
    
    
    _uploadButtonStateChange = {
      activate : function(){
        $('#ulButton').removeClass('is-light').addClass('button-yellow');
        $('#ulButton span').text('Add file');
        $('#ulButton i').removeClass('fa-spinner fa-spin').addClass('fa-plus');
        $('#ulButton input').attr('disabled', false);
      },
      disable : function(){
        $('#ulButton').addClass('is-light').removeClass('button-yellow');
        $('#ulButton span').text('Uploading...');
        $('#ulButton i').removeClass('fa-plus').addClass('fa-spinner fa-spin');
        $('#ulButton input').attr('disabled', true);
      } 
    };
    
    return {
        uploadFile : uploadFile
    };
    
}());