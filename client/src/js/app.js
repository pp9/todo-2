angular.module('todo', ['ui.router', 'todo.services', 'todo.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
              url: '/login',
              templateUrl: 'client/src/html/login.html',
              controller: 'LoginCtrl'
            })
            .state('index', {
              url: '/index',
              templateUrl: 'client/src/html/index.html',
              controller: 'MainCntr'
            })
            .state('projects', {
              url: '/projects',
              templateUrl: 'client/src/html/projects.html',
              // controller: 'MainCntr'
            })
            .state('today', {
              url: '/today',
              templateUrl: 'client/src/html/today.html',
              // controller: 'MainCntr'
            })

        $urlRouterProvider.otherwise('/index');
    })
