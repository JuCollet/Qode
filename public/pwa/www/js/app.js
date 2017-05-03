'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('mobile',['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuController'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchController'
      }
    }
  })

  .state('app.favorites', {
      cache: false,
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesController'
        }
      }
    })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })

  .state('app.myqodes', {
      cache: false,
      url: '/myqodes',
      views: {
        'menuContent': {
          templateUrl: 'templates/myqodes.html',
          controller: 'FavoritesController'

        }
      }
    })

  .state('app.qodeview', {
      url: '/qodeview/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/qodeview.html',
          controller: 'QodeViewController'
        }
      }
    })

  .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
