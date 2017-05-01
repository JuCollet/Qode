'use strict';

angular.module('app')

.directive('notification', function(){
  return {
    restrict : "E",
    templateUrl : "views/notification.html"
  };
})

.directive('confirmation', function(){
  return {
    restrict : "E",
    templateUrl : "views/confirmation.html"
  };
});