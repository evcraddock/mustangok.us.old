module app {

  'use strict';

  function routeConfig($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider,
                       $locationProvider: ng.ILocationProvider,
                       gettext: angular.gettext.gettextFunction) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        templateUrl: 'modules/shell/shell.html',
        controller: 'shellController as shell'
      })
      .state('app.home', {
        url: '/:category',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm',
        data: {title: 'Latest News in Mustang, Ok'}
      })
      .state('app.hometags', {
        url: '/:category/tags/:tag',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm',
        data: {title: 'Latest News in Mustang, Ok'}
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'aboutController as vm',
        data: {title: gettext('About')}
      })
      .state('app.calendar', {
        url: '/calendar/:category',
        templateUrl: 'modules/screens/calendar/index.html',
        controller: 'calendarController as vm',
        data: {title: 'Calendar'}
      })
      .state('app.article', {
        url: '/:category/articles/:permalink',
        templateUrl: 'modules/screens/article/index.html',
        controller: 'articleController as vm'
      });
  }

  angular
    .module('app')
    .config(routeConfig);

}

