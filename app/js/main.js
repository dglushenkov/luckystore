//=======================================================================
// DOM
//=======================================================================
$(function() {
    $('.js-click-prevent-defaults').on('click', function(e) {
        e.preventDefault();
    });

});

//=======================================================================
// Angular
//=======================================================================
var app = angular.module('luckystore', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'components/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/sales/category/:category/tag/:tag', {
                templateUrl: 'components/sales/sales.html',
                controller: 'SalesCtrl'
            })
            .when('/contacts', {
                templateUrl: 'components/contacts/contacts.html',
                controller: 'ContactsCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
}]);

