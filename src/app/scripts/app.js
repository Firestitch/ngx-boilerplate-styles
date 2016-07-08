'use strict';

angular
.module('app', [
    'config',
    'ngMaterial',    
    'angular.filter',
    'ui.router',
    'fs-angular-modal',
    'fs-angular-alert',
    'fs-angular-api',
    'fs-angular-bodyroute',
    'fs-angular-lister',
    'fs-angular-tabnav',
    'fs-angular-address',
    'fs-angular-validate',
    'fs-angular-password',
    'hljs',
    'angular-loading-bar'
])
.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, hljsServiceProvider, cfpLoadingBarProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    cfpLoadingBarProvider.includeSpinner = false;

    $urlRouterProvider.otherwise('/404');
    $urlRouterProvider.when('', '/');

    $stateProvider
    .state('root', {
        url: '/',
        onEnter: function($location) {
            $location.path('/patterns');
        }
    })

    .state('default', {
        templateUrl: 'views/templates/default.html'
    })

    .state('modal', {
        templateUrl: 'views/templates/modal.html'
    })

    .state('default.patterns', {
        url: '/patterns/:pattern/:param1/:param2', 
        templateUrl: 'views/patterns/patterns.html',
        controller: 'PatternsCtrl',
        params: {
            pattern: {
                value: null,
                squash: true
            },
            param1: {
                value: '',
                squash: true
            },
            param2: {
                value: '',
                squash: true
            }
        },
        resolve: {
            pattern: function ($stateParams) {
                return $stateParams.pattern || '';
            },
            param1: function ($stateParams) {
                return $stateParams.param1;
            },
            param2: function ($stateParams) {
                return $stateParams.param2;
            }
        }
    })

    .state('404', {
        templateUrl: 'views/404.html',
        controller: 'DemoCtrl'
    });

    $mdThemingProvider
    .definePalette('accent', $mdThemingProvider
                                .extendPalette('grey', {    '500': '106CC8',
                                                            'A200': '106CC8',
                                                            'contrastDefaultColor': 'light',
                                                            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'] }));
    $mdThemingProvider
    .definePalette('primary', $mdThemingProvider
                                .extendPalette('grey', {    '500' : '106CC8' }));

    $mdThemingProvider.theme('default')
        .primaryPalette('primary')
        .accentPalette('accent');

})
.run(function ($rootScope, BOWER, fsBodyroute, fsAlert) {
    $rootScope.app_name = BOWER.name;
    fsBodyroute.init({ target: $rootScope, event: '$stateChangeSuccess' });

    $rootScope.$on('$stateChangeSuccess', function(ev,data) {
        fsAlert.clear();
    });

});
