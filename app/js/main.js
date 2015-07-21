//=======================================================================
// DOM
//=======================================================================
$(function() {
    $('.js-click-prevent-defaults').on('click', function(e) {
        e.preventDefault();
    });

    $(window).on('scroll', function(e) {
        if ($(window).scrollTop() > 300) {
            $('.main-nav-container').addClass('fix-nav');
        } else {
            $('.main-nav-container').removeClass('fix-nav');
        }
    });

    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e) {
        var menu = $(this).find('.dropdown-menu').first().stop(true, true);
        menu.addClass('slidingUp')
            .slideUp(150, function() {
                $(this).removeClass('slidingUp');
            })
    });
});

//=======================================================================
// Angular
//=======================================================================
var app = angular.module('luckystore', ['ngRoute']);

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
            .otherwise({
                redirectTo: '/home'
            });
}]);

