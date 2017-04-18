'use strict';

angular.module('app',['ui.router','ngResource'])

.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/encode');

  $stateProvider

  .state('root', {
    abstract:true,
    views : {
      'nav' : {
        templateUrl : 'views/nav.html'
      },
      'content' : {
        template : '<div ui-view="contentView"></div>',
      }
    }
  })

  .state('root.encode', {
    url:'/encode',
    params : {encode:null},
    views : {
      'options@root' : {
        templateUrl : 'views/navSwitch.html',
        controller  : 'NavController'
      },
      'contentView@root' : {
        templateUrl : 'views/home.html',
        controller : 'EncodeController'
      }
    }
  })
  
  .state('root.decode', {
    url:'/decode',
    params : {encode:null},
    views : {
      'contentView@root' : {
        templateUrl : 'views/decode.html',
        controller : 'DecodeController'
      }, 
      'options@root' : {
        templateUrl : 'views/navSwitch.html',
        controller  : 'NavController'
      }
    }
  })
  
  .state('root.decodexs', {
    url:'/decodexs',
    params : {encode:null},    
    views : {
      'contentView@root' : {
        template : '<h1>Decode small</h1>'
      }, 
      'options@root' : {
        templateUrl : 'views/navSwitch.html',
        controller  : 'NavController'
      }
    }
  })

  .state('root.newQode', {
    url:'/new/:qode',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/newQode.html',
        controller : 'NewQodeController'
      },
      'newQodePreview@root.newQode' : {
        templateUrl : 'views/qodePreview.html'
      }
    }
  })

  .state('root.qode', {
    url:'/qode/:id',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/qodeView.html',
        controller : 'ViewQodeController'
      }
    }
  })
  
  .state('root.login', {
    url:'/login',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/login.html',
        controller : 'UserController'
      }
    }
  })

  .state('root.register', {
    url:'/register',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/register.html',
        controller : 'UserController'
      }
    }
  });

});
