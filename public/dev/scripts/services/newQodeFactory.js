'use strict';

angular.module('app')
  .factory('newQodeFactory', ['$rootScope','$resource', '$http', function($rootScope, $resource, $http){
  
    const dbOperations = $resource("/api/qodes/:id",null,{
      'create':{
        method:'POST'
      },
      'save':{
        method:'PUT'
      },
      'edit':{
        url:'/api/qodes/edit/',
        method:'POST'
      }
    });
    const isLogged = $resource("/user/logcheck",null,{'check':{method:'GET'}});
    
    const uploadButtonStateChange = {
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
    
    const _uploadFile = function(file, signedRequest, url, cb){
      $http({
        method: 'PUT',
        url: signedRequest,
        data:file
      }).then(function successCallback(res){
        let shortName;
        if(file.name.length > 25){
          shortName = file.name.split('');
          shortName.splice(25, shortName.length-25);
          shortName.push('...');
          shortName = shortName.join('');
        }
        const fileUrl = res.config.url.split('?')[0];
        cb(shortName || file.name, fileUrl, file.type.split('/')[1].toUpperCase());
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
  
    const getSignedRequest = function(file, cb){
      $http({
        method: 'GET',
        url: `/sign-s3?file-name=${file.name}&file-type=${file.type}`
        }).then(function successCallback(res) {
          _uploadFile(file, res.data.signedRequest, res.data.url, cb);
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
      isLogged: isLogged,
      getSignedRequest: getSignedRequest,
      uploadButtonStateChange: uploadButtonStateChange
    };

}]);