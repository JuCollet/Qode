/*global $*/

'use strict';

const uiModule = (function(){
  
    var displayQodes; // Function that display Qodes in 5 divs included in a .qode-chars class parent div;
    var searchQodesHandler; // Function that handles keyUps event for Qode searching;
    var testValidUrl; // Function that check is a String is a valid URL;

  
    //////////////////////////
    
  
    displayQodes = function(qodes, i = 0, j = 0){  
      const $qodeChars = $('.qode-code')[0].children;
      setTimeout(function(){
        if(i<qodes.length){
          if(j<qodes[0].length){
            $($qodeChars[i]).text(qodes[j][i]);
            j++;
            displayQodes(qodes, i, j);
            return;
          } else {
            j = 0;
            i++;
            displayQodes(qodes, i, j);
            return;
          }
        } else {
          i = 0;
          return;
        }
      },25);

    };


    //////////////////////////


    searchQodesHandler = function(char, getQode, $timeout, $state){
      
      // Using old Vanilla JS because of mobile restrictions (such oniPad);
      const char1 = document.search.char1,
            char2 = document.search.char2,
            char3 = document.search.char3,
            char4 = document.search.char4,
            char5 = document.search.char5;
            
      const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            
      const reset = function(){
         char1.value = "";
         char2.value = "";
         char3.value = "";
         char4.value = "";
         char5.value = "";
      };
      
      const isChar = function(char){
        if(alphabet.indexOf(char.toUpperCase()) === -1){
          return true;
        } else {
          return false;
        }
      };
      
      const isNum = function(char){
        const a = parseInt(char, 10);
        if(a !== "" && a >= 0 && a < 10){
          return true;
        } else {
          return false;
        }
      };
      
      $('#status').html('&nbsp;');
      switch(char){
        case 1:
          if(isChar(char1.value)){char1.value="";return;}
          char2.focus();
          break;
        case 2:
          if(isChar(char2.value)){char2.value="";return;}
          char3.focus();
          break;
        case 3:
          if(!isNum(char3.value)){char3.value="";return;}
          char4.focus();
          break;
        case 4:
          if(!isNum(char4.value)){char4.value="";return;}
          char5.focus();
          break;
        case 5:
          if(!isNum(char5.value)){char5.value="";return;}
          if(char1.value !== "" &&
             char2.value !== "" &&
             char3.value !== "" &&
             char4.value !== "" &&
             char5.value !== "") {
               
              $('#status').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Searching...');
              
              const qode = (char1.value+char2.value+char3.value+char4.value+char5.value).toUpperCase();
              
              getQode(qode).then(function(res){
                document.activeElement.blur();
                $('#status').html('<i class="fa fa-check is-green"></i>&nbsp;&nbsp;Found');
                $timeout(function(){
                  reset();
                  $('#status').html('&nbsp;');
                  $state.go('root.viewqode', {qode:qode});
                }, 500);
              },function(err){
                  $('#status').html(`<i class="fa fa-times is-red"></i>&nbsp;&nbsp;${err.statusText} :(`);
                  document.activeElement.blur();
                  reset();
              });
              } else {
                  reset();
                  document.activeElement.blur();
              }
      }

    }; // End of SearchQodesHandler
    
    
    //////////////////////////


    testValidUrl = function(string, $rootScope){
      if(string.substring(7,0) === "http://" || 
      string.substring(8,0) === "https://"){
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


    return {
      
      displayQodes : displayQodes,
      searchQodesHandler : searchQodesHandler,
      testValidUrl : testValidUrl
      
    };

}());