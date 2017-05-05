'use strict';

angular.module('app',['ui.router','ngResource'])

.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/getqode');

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

  .state('root.getqode', {
    url:'/getqode',
    params : {encode:null},
    views : {
      'options@root' : {
        templateUrl : 'views/navSwitch.html',
        controller  : 'NavController'
      },
      'contentView@root' : {
        templateUrl : 'views/getQode.html',
        controller : 'GetQodeController as qode'
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
      }
    }
  })

  .state('root.newQode', {
    url:'/new/:qode',
    views : {
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
  })
  
  .state('root.recovery', {
    url:'/recovery',
    views : {
      'contentView@root' : {
        templateUrl : 'views/recovery.html',
        controller : 'UserController'
      }
    }
  })
  
  .state('root.recoveryInfo', {
    url:'/recoveryinfo',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/recoveryInfo.html',
        controller : 'UserController'
      }
    }
  })
  
    .state('root.myaccount', {
    url:'/myaccount',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/myAccount.html',
        controller : 'UserController'
      }
    }
  });

});
