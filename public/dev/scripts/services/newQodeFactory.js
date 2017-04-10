'use strict';

angular.module('app')
  .constant('url', "/api/qodes/")
  .factory('newQodeFactory', ['$resource', 'url', function($resource, url){
  
    const dbOperations = $resource(url,null,{'save':{method:'POST'}}); 
    
    const _uploadFile = function(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url;
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    };
    
    const getSignedRequest = function(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log(xhr)
            const response = JSON.parse(xhr.responseText);
            _uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    };
    
    return {
      dbOperations: dbOperations,
      getSignedRequest: getSignedRequest
    };

}]);