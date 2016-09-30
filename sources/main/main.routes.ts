module app {

  'use strict';

  /**
   * Configures the application routes.
   */
  function routeConfig($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider,
                       $locationProvider: ng.ILocationProvider,
                       gettext: angular.gettext.gettextFunction) {

    // Routes configuration
    //$locationProvider.html5Mode(true);
    
    $urlRouterProvider.otherwise('/');


    $stateProvider
      .state('app', {
        templateUrl: 'modules/shell/shell.html',
        controller: 'shellController as shell'
      })
      .state('app.home', {
        url: '/',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm',
        data: {title: gettext('Home')}
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'aboutController as vm',
        data: {title: gettext('About')}
      })
      .state('app.twentytwenty', {
        url: '/classof2020',
        templateUrl: 'modules/screens/classof2020/index.html',
        controller: 'twentytwentyController as vm',
        data: {title: 'Class of 2020', sectionTitle: 'Mustang High School'}
      })
      .state('app.twentytwentycalendar', {
        url: '/classof2020/calendar',
        templateUrl: 'modules/screens/classof2020/calendar.html',
        controller: 'twentytwentycalendarController as vm',
        data: {title: 'Class of 2020 Calendar', sectionTitle: 'Mustang High School'}
      })
      .state('app.mysacolts', {
        url: '/mysacolts',
        templateUrl: 'modules/screens/mysacolts/index.html',
        controller: 'mysacoltsController as vm',
        data: {title: 'MYSA Colts'}
      })
      .state('app.articlelist', {
        url: '/:category/:tag/articles',
        templateUrl: 'modules/screens/articlelist/index.html',
        controller: 'articlelistController as vm'
      })
      .state('app.categoryarticlelist', {
        url: '/:category/articles',
        templateUrl: 'modules/screens/articlelist/index.html',
        controller: 'articlelistController as vm'
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

