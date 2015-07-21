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


app.controller('HomeCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('products/products.json').success(function(data) {
            $scope.products = data;
        });

        $scope.newsletter = function() {
            $http.get('components/dummy_response/login.json').success(function(data) {
                $scope.res = data;
                $('.js-response-modal').modal('show');
            });
        }
}]);

app.directive('ngInitCarousel', function() {
    return function(scope, element, attr) {
        if (scope.$last) {
            owlCarouselInit('.js-home-products-carousel');
        }
    }
});

function owlCarouselInit(selector) {
    var owl = $(selector);
    $('.js-home-products-carousel-prev').on('click', function() {
        owl.trigger('prev.owl.carousel');
    });

    $('.js-home-products-carousel-next').on('click', function() {
        owl.trigger('next.owl.carousel');
    });

    owl.owlCarousel({
        loop: false,
        slideBy: 'page',
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });
}

app.controller('SalesCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('products/products.json').success(function(data) {
            $scope.products = data;
        });

        $scope.category = $routeParams.category;
        $scope.tag = $routeParams.tag;

        $scope.isMatchParams = function(product) {
            if ($scope.category != 'all') {
                if ($scope.category.indexOf('-') == -1) {
                    var ctg = product.category.replace(/-\S+/, '');
                    if (ctg != $scope.category) {
                        return false;
                    }
                } else if (product.category != $scope.category) {
                    return false;
                }
            }

            if ($scope.tag != 'all') {
                if (product.tag != $scope.tag) return false;
            }

            return true;
        }
}]);
