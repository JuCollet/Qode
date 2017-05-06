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
        controller  : 'NavController as nav'
      },
      'contentView@root' : {
        templateUrl : 'views/qodeGet.html',
        controller : 'QodeGetController as qode'
      }
    }
  })
  
  .state('root.search', {
    url:'/search',
    params : {encode:null},
    views : {
      'options@root' : {
        templateUrl : 'views/navSwitch.html',
        controller  : 'NavController as nav'
      },
      'contentView@root' : {
        templateUrl : 'views/qodeSearch.html',
        controller : 'QodeSearchController as qode'
      }
    }
  })

  .state('root.editqode', {
    url:'/new/:qode',
    views : {
      'contentView@root' : {
        templateUrl : 'views/qodeEdit.html',
        controller : 'QodeEditController as edit'
      },
      'newQodePreview@root.editqode' : {
        templateUrl : 'views/qodePreview.html'
      }
    }
  })

  .state('root.viewqode', {
    url:'/qode/:qode',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/qodeView.html',
        controller : 'QodeViewController as view'
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
        templateUrl : 'views/userLogin.html',
        controller : 'UserController as user'
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
        templateUrl : 'views/userRegister.html',
        controller : 'UserController as user'
      }
    }
  })
  
  .state('root.recovery', {
    url:'/recovery',
    views : {
      'contentView@root' : {
        templateUrl : 'views/userRecovery.html',
        controller : 'UserController as user'
      }
    }
  })
  
  .state('root.recoveryrequest', {
    url:'/recoveryrequest',
    views : {
      'options@root' : {
        templateUrl : 'views/navBack.html'
      },
      'contentView@root' : {
        templateUrl : 'views/userRecoveryRequest.html',
        controller : 'UserController as user'
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
        templateUrl : 'views/userAccount.html',
        controller : 'UserController as user'
      }
    }
  });

});
