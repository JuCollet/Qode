'use strict';

const jumpnext = function(nextid){
  switch(nextid){
    case 1:
      document.decode.char2.focus();
      break;
    case 2:
      document.decode.char3.focus();
      break;
    case 3:
      document.decode.char4.focus();
      break;
    case 4:
      document.decode.char5.focus();
      break;
  }
};