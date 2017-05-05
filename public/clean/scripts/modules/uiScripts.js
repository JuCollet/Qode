/*global $*/

'use strict';

const uiScripts = (function(){
  
    var displayQodes = function(qodes, i = 0, j = 0){  // Function that display Qodes in 5 divs included in a .qode-chars class parent div;

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

    return {
      displayQodes : displayQodes
    };

}());