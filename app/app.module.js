var app = angular.module('luckystore', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/home/homeView.html',
                controller: 'homeCtrl'
            })
            .when('/sales/category/:category/tag/:tag', {
                templateUrl: 'app/components/sales/salesView.html',
                controller: 'salesCtrl'
            })
            .when('/contacts', {
                templateUrl: 'app/components/contacts/contactsView.html',
                controller: 'contactsCtrl'
            })
            .when('/login', {
                templateUrl: 'app/components/login/loginView.html',
                controller: 'loginCtrl'
            })
            .when('/search', {
                templateUrl: 'app/components/search/searchView.html',
                controller: 'searchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
}]);

