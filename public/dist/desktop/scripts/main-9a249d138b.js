'use strict';

angular.module('app', ['ui.router', 'ngResource']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/getqode');

  $stateProvider.state('root', {
    abstract: true,
    views: {
      'nav': {
        templateUrl: 'views/nav.html'
      },
      'content': {
        template: '<div ui-view="contentView"></div>'
      }
    }
  }).state('root.getqode', {
    url: '/getqode',
    params: { encode: null },
    views: {
      'options@root': {
        templateUrl: 'views/navSwitch.html',
        controller: 'NavController'
      },
      'contentView@root': {
        templateUrl: 'views/getQode.html',
        controller: 'GetQodeController as qode'
      }
    }
  }).state('root.search', {
    url: '/search',
    params: { encode: null },
    views: {
      'contentView@root': {
        templateUrl: 'views/searchQode.html',
        controller: 'SearchQodeController as qode'
      },
      'options@root': {
        templateUrl: 'views/navSwitch.html',
        controller: 'NavController'
      }
    }
  }).state('root.decodexs', {
    url: '/decodexs',
    params: { encode: null },
    views: {
      'contentView@root': {
        template: '<h1>Decode small</h1>'
      }
    }
  }).state('root.newQode', {
    url: '/new/:qode',
    views: {
      'contentView@root': {
        templateUrl: 'views/newQode.html',
        controller: 'NewQodeController'
      },
      'newQodePreview@root.newQode': {
        templateUrl: 'views/qodePreview.html'
      }
    }
  }).state('root.qode', {
    url: '/qode/:id',
    views: {
      'options@root': {
        templateUrl: 'views/navBack.html'
      },
      'contentView@root': {
        templateUrl: 'views/qodeView.html',
        controller: 'ViewQodeController'
      }
    }
  }).state('root.login', {
    url: '/login',
    views: {
      'options@root': {
        templateUrl: 'views/navBack.html'
      },
      'contentView@root': {
        templateUrl: 'views/login.html',
        controller: 'UserController'
      }
    }
  }).state('root.register', {
    url: '/register',
    views: {
      'options@root': {
        templateUrl: 'views/navBack.html'
      },
      'contentView@root': {
        templateUrl: 'views/register.html',
        controller: 'UserController'
      }
    }
  }).state('root.recovery', {
    url: '/recovery',
    views: {
      'contentView@root': {
        templateUrl: 'views/recovery.html',
        controller: 'UserController'
      }
    }
  }).state('root.recoveryInfo', {
    url: '/recoveryinfo',
    views: {
      'options@root': {
        templateUrl: 'views/navBack.html'
      },
      'contentView@root': {
        templateUrl: 'views/recoveryInfo.html',
        controller: 'UserController'
      }
    }
  }).state('root.myaccount', {
    url: '/myaccount',
    views: {
      'options@root': {
        templateUrl: 'views/navBack.html'
      },
      'contentView@root': {
        templateUrl: 'views/myAccount.html',
        controller: 'UserController'
      }
    }
  });
}]);

/*global $*/

'use strict';

var uiScripts = function () {

  var displayQodes = function displayQodes(qodes) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var j = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // Function that display Qodes in 5 divs included in a .qode-chars class parent div;

    var $qodeChars = $('.qode-code')[0].children;
    setTimeout(function () {
      if (i < qodes.length) {
        if (j < qodes[0].length) {
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
    }, 25);
  };

  return {
    displayQodes: displayQodes
  };
}();
/*global $, angular*/

(function () {

  'use strict';

  qodeFactory.$inject = ["$http", "$q"];
  angular.module('app').factory('qodeFactory', qodeFactory);

  /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
  function qodeFactory($http, $q) {

    var getQode = function getQode(qode) {
      return $http.get('/api/qodes/' + qode);
    },
        upVote = function upVote(qodeId) {
      return $http.post('/api/qodes/upvote/', { toUpvote: qodeId });
    },
        checkIfAvailable = function checkIfAvailable(qode) {
      return $http.post('/api/qodes/check/', { qode: qode });
    },
        addToFavorites = function addToFavorites(qodeId) {
      return $http.put('/user/addtofavorites/', { favId: qodeId });
    },
        doCheckIfAvailable,
        // Check if qode provided is already taken or not (qode,succesCb,errorCb);
    makeMockQodes; // Return a promise with an array of X qodes which the last one is unique in DB (X);

    doCheckIfAvailable = function doCheckIfAvailable(qodeToCheck, successCb, errorCb) {
      checkIfAvailable(qodeToCheck).then(function successCallback(res) {
        if (res.data.isAvailable) {
          successCb();
        } else {
          errorCb();
        }
      }, function errorCallback(err) {
        return err;
      });
    };

    makeMockQodes = function makeMockQodes() {
      var nbrMocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;


      var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      // This function return a promise because it use checkQodeIfAvailable function wich is asynchronous.
      // It pass a resolve function in it, wich returns the array of mock qodes with a unique one at index length-1.
      return $q(function (resolve, reject) {
        var qodeArray = [];
        for (var i = 0; i < nbrMocks; i++) {
          var qode = "";
          for (var j = 0; j < 5; j++) {
            if (j < 2) {
              qode += alphabet[Math.floor(Math.random() * 24)];
            } else {
              qode += Math.floor(Math.random() * 10);
            }
          }
          qodeArray.push(qode);
        }

        doCheckIfAvailable(qodeArray[nbrMocks - 1], function () {
          resolve(qodeArray);
        }, function () {
          reject('error');
        });
      });
    };

    return {
      getQode: getQode,
      upVote: upVote,
      addToFavorites: addToFavorites,
      doCheckIfAvailable: doCheckIfAvailable,
      makeMockQodes: makeMockQodes
    };
  } // End qodeFactory
})();
'use strict';

angular.module('app').service('viewQodeFactory', ['$resource', function ($resource) {

  var qodes = $resource("/api/qodes/:id", null, {
    upvote: {
      url: '/api/qodes/upvote/',
      method: 'POST'
    } });

  return {
    qodes: qodes
  };
}]);
'use strict';

angular.module('app').factory('newQodeFactory', ['$rootScope', '$resource', '$http', function ($rootScope, $resource, $http) {

  var dbOperations = $resource("/api/qodes/:id", null, {
    'create': {
      method: 'POST'
    },
    'save': {
      method: 'PUT'
    },
    'edit': {
      url: '/api/qodes/edit/',
      method: 'POST'
    }
  });

  var uploadButtonStateChange = {
    activate: function activate() {
      $('#ulButton').removeClass('is-light').addClass('button-yellow');
      $('#ulButton span').text('Add file');
      $('#ulButton i').removeClass('fa-spinner fa-spin').addClass('fa-plus');
      $('#ulButton input').attr('disabled', false);
    },
    disable: function disable() {
      $('#ulButton').addClass('is-light').removeClass('button-yellow');
      $('#ulButton span').text('Uploading...');
      $('#ulButton i').removeClass('fa-plus').addClass('fa-spinner fa-spin');
      $('#ulButton input').attr('disabled', true);
    }
  };

  var _uploadFile = function _uploadFile(file, signedRequest, url, cb) {
    $http({
      method: 'PUT',
      url: signedRequest,
      data: file
    }).then(function successCallback(res) {
      var shortName = void 0;
      var nameLength = 20;
      if (file.name.length > nameLength) {
        shortName = file.name.split('');
        shortName.splice(nameLength, shortName.length - nameLength);
        shortName.push('...');
        shortName = shortName.join('');
      }
      var fileUrl = res.config.url.split('?')[0];
      cb(shortName || file.name, fileUrl, file.type.split('/')[1].toUpperCase());
      uploadButtonStateChange.activate();
    }, function errorCallback() {
      $rootScope.$broadcast('notification', {
        color: 'red',
        title: 'Oops...',
        message: 'Try again later',
        glyph: 'fa fa-times'
      });
      uploadButtonStateChange.activate();
    });
  };

  var getSignedRequest = function getSignedRequest(file, cb) {
    $http({
      method: 'GET',
      url: '/sign-s3?file-name=' + file.name + '&file-type=' + file.type
    }).then(function successCallback(res) {
      _uploadFile(file, res.data.signedRequest, res.data.url, cb);
    }, function errorCallback() {
      $rootScope.$broadcast('notification', {
        color: 'red',
        title: 'Oops...',
        message: 'Try again later',
        glyph: 'fa fa-times'
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
/*global $, angular*/

(function () {

  'use strict';

  userFactory.$inject = ["$http"];
  angular.module('app').factory('userFactory', userFactory);

  /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
  function userFactory($http) {

    var getUser = function getUser() {
      return $http.get('/user');
    },
        addToFavorites = function addToFavorites() {
      return $http.put('/user/addtofavorites');
    },
        deleteQode = function deleteQode(qodeId) {
      return $http.delete('/user/deleteqode/' + qodeId);
    },
        isLogged = function isLogged() {
      return $http.get('/user/isLogged');
    },
        login = function login(user) {
      return $http.post('/user/login', user);
    },
        logout = function logout() {
      return $http.get('/user/logout');
    },
        recovery = function recovery(mail) {
      return $http.post('/user/passwordrecovery', { mail: mail });
    },
        register = function register(user) {
      return $http.post('/user', user);
    },
        reset = function reset(newPassword) {
      return $http.put('/user', { newPassword: newPassword });
    },
        removeFromFavorites = function removeFromFavorites(qodeId) {
      return $http.put('/user/removefromfavorites', { favId: qodeId });
    };

    return {
      getUser: getUser,
      addToFavorites: addToFavorites,
      deleteQode: deleteQode,
      isLogged: isLogged,
      login: login,
      logout: logout,
      recovery: recovery,
      register: register,
      reset: reset,
      removeFromFavorites: removeFromFavorites
    };
  }
})();
/*global $, angular*/

(function () {

  'use strict';

  AppController.$inject = ["$rootScope", "$timeout", "userFactory"];
  angular.module('app').controller('AppController', AppController);

  /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
  function AppController($rootScope, $timeout, userFactory) {

    var vm = this;
    var checkCurrentUser; // Check if user is logged or not;
    var backButtonRedirection; // Change back button destination depending on where the user came from;
    var notificationListener; // Listen for notifications to be displayed;

    vm.$notification = $('notification');
    vm.backButtonDestination = "root.encode";
    vm.notification = {
      color: "",
      messageTitle: "",
      message: "",
      glyph: ""
    };

    $rootScope.currentUser = {
      isLogged: false,
      name: ""
    };

    checkCurrentUser = function () {
      userFactory.isLogged().then(function (res) {
        if (res.isLogged !== undefined && res.isLogged.log === true) {
          $rootScope.currentUser.isLogged = true;
          $rootScope.currentUser.name = res.isLogged.name;
        } else {
          $rootScope.currentUser.isLogged = false;
          $rootScope.currentUser.name = "";
        }
      }, function (err) {
        if (err) {
          throw err;
        }
      });
    }();

    backButtonRedirection = function () {
      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
        if (from.name !== null && from.name !== undefined) {
          if (from.name === 'root.myaccount') {
            vm.backButtonDestination = 'root.myaccount';
          } else if (from.name === 'root.login') {
            vm.backButtonDestination = 'root.login';
          } else if (from.name === 'root.decode') {
            vm.backButtonDestination = 'root.decode({encode:"decode"})';
          } else {
            vm.backButtonDestination = 'root.encode';
          }
        }
      });
    }();

    notificationListener = function () {
      $rootScope.$on('notification', function (event, args) {
        vm.notification.color = args.color;
        vm.notification.messageTitle = args.title;
        vm.notification.message = args.message;
        vm.notification.glyph = args.glyph;

        // Set JQuery method in angular $applyAsync method to put in $digest queue, 
        // so the $scope is correctly updated before the notification pane is shown;
        // This is the new evlSync method (angular > 1.2) explained here :
        // https://www.bennadel.com/blog/2605-scope-evalasync-vs-timeout-in-angularjs.htm
        vm.$applyAsync(function () {
          $('body > div').addClass('is-blurred');
          vm.$notification.fadeIn(250).delay(1500).fadeOut(500);
        });
        $timeout(function () {
          $('body > div').removeClass('is-blurred');
        }, 2250);
      });
    }();
  }
})();
'use strict';

angular.module('app').controller('NavController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

  var encodeQode = $state.params.encode || 'encode';
  var posEncode = 4,
      posDecode = 34,
      toggleSpeed = 50,
      $switchQode = $(".switch"),
      $switchCursor = $(".switch-cursor");

  var setToggle = function () {
    if (encodeQode === 'encode') {
      $switchCursor.css({ marginLeft: posEncode + 'px' });
    } else {
      $switchCursor.css({ marginLeft: posDecode + 'px' });
    }
  }();

  $scope.switchToggle = function () {
    if (encodeQode === 'decode') {
      $switchCursor.animate({ marginLeft: posEncode + 'px' }, toggleSpeed, function () {
        $state.go('root.encode', { encode: 'encode' });
      });
    } else {
      if ($(window).width() > 768) {
        $switchCursor.animate({ marginLeft: posDecode + 'px' }, toggleSpeed, function () {
          $state.go('root.decode', { encode: 'decode' });
        });
      } else {
        $switchCursor.animate({ marginLeft: posDecode + 'px' }, toggleSpeed, function () {
          $state.go('root.decodexs', { encode: 'decode' });
        });
      }
    }
  };

  $switchQode.tooltip({ "show": 200, "hide": 500 });
}]);

/*global $, angular, uiScripts*/

(function () {

  'use strict';

  GetQodeController.$inject = ["$rootScope", "qodeFactory", "newQodeFactory", "userFactory", "$state"];
  angular.module('app').controller('GetQodeController', GetQodeController);

  /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
  function GetQodeController($rootScope, qodeFactory, newQodeFactory, userFactory, $state) {

    var vm = this;
    var selectedQode = void 0;

    vm.refresh = refresh; // Displays new Qode;
    vm.getThis = getThis; // Go further when the user choose the displayed Qode;

    function refresh() {

      var getQodesAsync = qodeFactory.makeMockQodes(5); // mockQodes returns a promise.

      getQodesAsync.then(function qodeIsAvailable(qodes) {
        selectedQode = qodes[qodes.length - 1];
        uiScripts.displayQodes(qodes);
      }, function qodeIsNotAvailable() {
        vm.refresh();
      });
    }

    function getThis() {

      qodeFactory.checkIfAvailable(selectedQode, function successCb() {
        // Check if user is logged in or not
        userFactory.isLogged().then(function (res) {
          if (res.isLogged !== undefined && res.isLogged.log === true) {
            newQodeFactory.dbOperations.create({ qode: selectedQode }).$promise.then(function () {
              $state.go('root.newQode', { qode: selectedQode });
            });
          } else {
            $rootScope.$broadcast('notification', {
              color: 'red',
              message: "You're not logged",
              title: 'Oops...',
              glyph: 'fa fa-times'
            });
          }
        });
      }, function errorCb() {
        $rootScope.$broadcast('notification', {
          color: 'red',
          message: "It's not available anymore",
          title: 'Oops...',
          glyph: 'fa fa-times'
        });
      });
    }

    vm.refresh(); // Displays Qodes when loaded;
  } // End GetQodeController
})();
'use strict';

angular.module('app').controller('NewQodeController', ['$rootScope', '$scope', '$state', '$timeout', 'newQodeFactory', function ($rootScope, $scope, $state, $timeout, newQodeFactory) {

  var actualCardColor = 0;
  var cardColors = ['default', 'orange', 'yellow', 'green', 'blue', 'purple'];

  var card = function card(color) {
    this.cardTitle = "";
    this.cardText = "";
    this.cardReferences = [];
    this.color = color;
  };

  var cardReference = function cardReference(name, url) {
    this.text = name;
    this.link = url;
  };

  var file = function file(name, path, type) {
    this.fileName = name;
    this.filePath = path;
    this.fileType = type;
  };

  var addFileToScope = function addFileToScope(name, path, type) {
    $scope.newQode.files.push(new file(name, path, type));
  };

  $scope.newReference = {
    url: "",
    name: ""
  };

  $scope.removeFile = function (index) {
    $scope.newQode.files.splice(index, 1);
  };

  $scope.removeReference = function (cardIndex, refIndex) {
    $scope.newQode.cards[cardIndex].cardReferences.splice(refIndex, 1);
  };

  newQodeFactory.dbOperations.edit({ qode: $state.params.qode }).$promise.then(function success(qode) {
    $scope.newQode = qode;
  }, function error(err) {
    $state.go('root.encode');
    $rootScope.$broadcast('notification', {
      color: 'red',
      message: err.data.error.message,
      title: 'Oops...',
      glyph: 'fa fa-times'
    });
  });

  $scope.confirm = false;

  $scope.confirmToggle = function () {
    $scope.confirm = !$scope.confirm;
  };

  $scope.addNewCard = function () {
    actualCardColor++;
    if (actualCardColor === cardColors.length) {
      actualCardColor = 1;
    }
    $scope.newQode.cards.push(new card(cardColors[actualCardColor]));
  };

  var testValidUrl = function testValidUrl(stringToTest) {
    if (stringToTest.substring(7, 0) === "http://" || stringToTest.substring(8, 0) === "https://" || stringToTest.substring(4, 0) === "www.") {
      return true;
    } else {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: 'No valid url found',
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
      return false;
    }
  };

  $scope.addReference = function (i) {
    if (!testValidUrl($scope.newReference.url)) {
      return;
    }
    if ($scope.newReference.url !== "" && $scope.newReference.name !== "") {
      $scope.newQode.cards[i].cardReferences.push(new cardReference($scope.newReference.name, $scope.newReference.url));
      $scope.newReference = { url: "", name: "" };
      return;
    } else if ($scope.newReference.url !== "") {
      $scope.newQode.cards[i].cardReferences.push(new cardReference($scope.newReference.url, $scope.newReference.url));
      $scope.newReference = { url: "", name: "" };
      return;
    } else {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: 'No reference to add',
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
    }
  };

  $scope.deleteCard = function (index) {
    $('#card' + index + '>.card-delete').fadeOut(50, function () {
      $('#card' + index).slideUp(200, function () {
        $scope.newQode.cards.splice(parseInt(index), 1);
        $scope.$apply();
      });
    });
  };

  $scope.postQode = function () {
    if ($scope.newQode.title === undefined || $scope.newQode.title.length < 2) {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: 'You forgot the title',
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
      $scope.confirmToggle();
      return;
    } else {
      newQodeFactory.dbOperations.save({ id: $scope.newQode._id }, $scope.newQode).$promise.then(function () {
        $rootScope.$broadcast('notification', {
          color: 'green',
          message: 'Your Qode is online',
          title: 'Congratulations !',
          glyph: 'fa fa-check'
        });
        $timeout(function () {
          $state.go('root.qode', { id: $scope.newQode.qode });
        }, 1500);
      });
    }
  };

  document.getElementById("fileUpload").onchange = function () {
    if ($scope.newQode.files.length < 5) {
      var files = document.getElementById("fileUpload").files;
      var _file = files[0];
      if (_file === null || _file === undefined) {
        return;
      } // Standard is : if (variable == null) though, to check both null & undefined;
      else {
          newQodeFactory.uploadButtonStateChange.disable();
        }
      if (_file.size < 10485760) {
        // 10485760 octets = 10mb
        newQodeFactory.getSignedRequest(_file, addFileToScope);
      } else {
        $rootScope.$broadcast('notification', {
          color: 'red',
          title: 'Oops...',
          message: 'This file is too big',
          glyph: 'fa fa-tachometer'
        });
        newQodeFactory.uploadButtonStateChange.activate();
      }
    } else {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: '5 files maximum',
        title: 'Sorry...',
        glyph: 'fa fa-times'
      });
    }
  };

  $('.card-color-choice').click(function (e) {
    var $el = $(this),
        $card = $(this).parents()[1];

    if ($el.attr("data-isSelected") === "true") {
      $('.card-color-choice').removeAttr("data-isSelected");
      $($card).attr("data-color", "default");
    } else {
      $('.card-color-choice').removeAttr("data-isSelected");
      $el.attr("data-isSelected", true);
      $($card).attr("data-color", e.currentTarget.id.substr(11));
    }
  });
}]);
/*global $, angular, uiScripts*/

(function () {

  'use strict';

  angular.module('app').controller('SearchQodeController', SearchQodeController);

  /* @ngInject */ // Used with Ng-Annotate in Gulp, this inject dependencies automatically;
  function SearchQodeController() {}

  /*
    
    const char1 = document.decode.char1,
          char2 = document.decode.char2,
          char3 = document.decode.char3,
          char4 = document.decode.char4,
          char5 = document.decode.char5;
          
      const reset = function(){
         char1.value = "";
         char2.value = "";
         char3.value = "";
         char4.value = "";
         char5.value = "";
      };
      
      let checking = false;
      
      $scope.jumpnext = function(nextid){
        $('#status').html('&nbsp;');
        switch(nextid){
          case 1:
            char2.focus();
            break;
          case 2:
            char3.focus();
            break;
          case 3:
            char4.focus();
            break;
          case 4:
            char5.focus();
            break;
          case 5:
            if(char1.value !== "" &&
               char2.value !== "" &&
               char3.value !== "" &&
               char4.value !== "" &&
               char5.value !== "") {
                 
                 $('#status').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Searching...');
                 
                 const qode = (char1.value+char2.value+char3.value+char4.value+char5.value).toUpperCase();
                 
                 qodeFactory.getQode(qode).then(function(res){
                  document.activeElement.blur();
                  $('#status').html('<i class="fa fa-check is-green"></i>&nbsp;&nbsp;Found');
                  $timeout(function(){
                    reset();
                    $('#status').html('&nbsp;');
                    $state.go('app.qodeview', {id:qode});
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
      };
   */

  // End SearchQodeController;
})();
'use strict';

angular.module('app').controller('ViewQodeController', ['$scope', '$stateParams', 'viewQodeFactory', 'userFactory', function ($scope, $stateParams, viewQodeFactory, userFactory) {

  $scope.data = viewQodeFactory.qodes.get({ id: $stateParams.id }).$promise.then(function (res) {
    $scope.qode = res;
  });

  $scope.thanksAuthor = function (qode) {
    viewQodeFactory.qodes.upvote({ toUpvote: qode }).$promise.then(function () {
      $scope.qode.upVotes++;
      $scope.qode.isLiked = true;
    });
  }; // end thanksAuthor function

  $scope.addToFavorites = function (qodeId) {
    userFactory.user.addToFavorites({ favId: qodeId }).$promise.then(function () {
      $scope.qode.isFavorited = true;
    });
  }; // end addToFavorites function
}]);
'use strict';

angular.module('app').controller('UserController', ['$rootScope', '$scope', '$state', 'userFactory', function ($rootScope, $scope, $state, userFactory) {

  $scope.name = "";
  $scope.mail = "";
  $scope.password = "";
  $scope.confirmPassword = "";

  $scope.passwordValidation = function () {
    return $scope.password === $scope.confirmPassword;
  };

  $scope.login = function () {
    var user = {
      mail: $scope.mail,
      password: $scope.password
    };

    userFactory.login(user).then(function success(res) {
      $rootScope.isLogged = {
        log: true,
        name: res.name,
        favorites: res.favorites
      };
      $state.go('root.encode', { encode: 'encode' });
    }, function error(err) {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: err.data.error.message,
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
    });
  }; // End login function

  $scope.logout = function () {
    userFactory.logout().then(function success() {
      $rootScope.isLogged = {
        log: false,
        name: '',
        favorites: []
      };
    }, function error() {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: "Can't log out",
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
    });
  }; // End logout function

  $scope.register = function () {
    var user = {
      name: $scope.name,
      mail: $scope.mail,
      password: $scope.password,
      confirmPassword: $scope.confirmPassword
    };

    if (user.password !== user.confirmPassword) {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: "doesn't match",
        title: 'Passwords',
        glyph: 'fa fa-times'
      });
      return;
    }

    userFactory.register(user).then(function success(res) {
      $rootScope.isLogged = {
        log: true,
        name: res.name,
        favorites: res.favorites
      };
      $rootScope.$broadcast('notification', {
        color: 'green',
        message: "You're in, " + res.name,
        title: 'Welcome',
        glyph: 'fa fa-check'
      });
      $state.go('root.encode', { encode: 'encode' });
    }, function error(err) {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: err.data.error.message,
        title: 'Oops...',
        glyph: 'fa fa-times'
      });
    });
  }; // End register function

  if ($rootScope.currentUser.isLogged === true) {
    $scope.data = userFactory.getUser().then(function (res) {
      $scope.user = res;
    });
  }

  $scope.viewQode = function (qode) {
    $state.go('root.qode', { id: qode });
  };

  $scope.removeFromFavorites = function (qodeId, index) {
    $scope.user.favorites.splice(index, 1);
    userFactory.user.removeFromFavorites({ favId: qodeId });
  };

  $scope.deleteQode = function (qodeId, index) {
    $scope.user.myqodes.splice(index, 1);
    userFactory.user.deleteQode({ qodeId: qodeId });
  };

  $scope.editQode = function (qodeId) {
    $state.go('root.newQode', { qode: qodeId });
  };

  $scope.recovery = function () {
    userFactory.recovery($scope.mail).then(function () {
      $rootScope.$broadcast('notification', {
        color: 'green',
        message: "Check your emails.",
        title: 'Alright !',
        glyph: 'fa fa-check'
      });
      $state.go('root.encode');
    }, function (err) {
      $rootScope.$broadcast('notification', {
        color: 'red',
        message: err.data.error.message,
        title: 'Oops..',
        glyph: 'fa fa-times'
      });
    });
  };

  $scope.resetPassword = function () {
    userFactory.user.reset($scope.confirmPassword).then(function () {
      $rootScope.$broadcast('notification', {
        color: 'green',
        message: "Password reset",
        title: 'Alright !',
        glyph: 'fa fa-check'
      });
      $state.go('root.encode');
    });
  };
}]);
'use strict';

angular.module('app').directive('notification', function () {
  return {
    restrict: "E",
    templateUrl: "views/notification.html"
  };
}).directive('confirmation', function () {
  return {
    restrict: "E",
    templateUrl: "views/confirmation.html"
  };
});