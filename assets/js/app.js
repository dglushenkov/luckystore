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


app.controller('ContactsCtrl', ['$scope', function($scope) {
    var mapCanvas = document.querySelector('.js-google-maps');
    var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
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

app.controller('NavbarCtrl', ['$scope', function($scope) {
    $scope.isCollapsed = true;
    // $scope.menIsOpen = false;
    // $scope.womenIsOpen = false;
    $scope.dropdowns = {};

    $scope.toggleNav = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $(window).on('scroll.stickyNav', function(e) {
        if ($(window).scrollTop() > stickyNav.getNavBottom()) {
            stickyNav.makeSticky();
        } else {
            stickyNav.removeSticky();
        }
    });

    var stickyNav = {
        isSticky: false,
        nav: $('.main-nav-container'),
        placeholder: $('.main-nav-placeholder'),

        getNavBottom: function() {
            var container = (this.isSticky) ? this.placeholder : this.nav;
            var bottom = container.height() + container.offset().top;
            return bottom;
        },

        makeSticky: function() {
            if (this.isSticky) return;

            this.placeholder.height(this.nav.height());
            this.placeholder.css({
                marginTop: this.nav.css('margin-top'),
                marginBottom: this.nav.css('margin-bottom')
            })
            this.placeholder.show();
            this.nav.addClass('fix-nav');
            this.closeDropdowns();

            this.isSticky = true;
        },

        closeDropdowns: function() {
            for (var cs = $scope.$$childHead; cs; cs = cs.$$nextSibling) {
                if (cs.isOpen !== undefined) {
                    cs.isOpen = false;
                }
            }
            $scope.$apply();
        },

        removeSticky: function() {
            if (!this.isSticky) return;

            this.placeholder.hide();
            this.nav.removeClass('fix-nav');
            this.closeDropdowns();2

            this.isSticky = false;
        }
    }

    $(window).trigger('scroll.stickyNav');
}]);
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


app.controller('ContactsCtrl', ['$scope', function($scope) {
    var mapCanvas = document.querySelector('.js-google-maps');
    var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}]);
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

app.controller('NavbarCtrl', ['$scope', function($scope) {
    $scope.isCollapsed = true;
    // $scope.menIsOpen = false;
    // $scope.womenIsOpen = false;
    $scope.dropdowns = {};

    $scope.toggleNav = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $(window).on('scroll.stickyNav', function(e) {
        if ($(window).scrollTop() > stickyNav.getNavBottom()) {
            stickyNav.makeSticky();
        } else {
            stickyNav.removeSticky();
        }
    });

    var stickyNav = {
        isSticky: false,
        nav: $('.main-nav-container'),
        placeholder: $('.main-nav-placeholder'),

        getNavBottom: function() {
            var container = (this.isSticky) ? this.placeholder : this.nav;
            var bottom = container.height() + container.offset().top;
            return bottom;
        },

        makeSticky: function() {
            if (this.isSticky) return;

            this.placeholder.height(this.nav.height());
            this.placeholder.css({
                marginTop: this.nav.css('margin-top'),
                marginBottom: this.nav.css('margin-bottom')
            })
            this.placeholder.show();
            this.nav.addClass('fix-nav');
            this.closeDropdowns();

            this.isSticky = true;
        },

        closeDropdowns: function() {
            for (var cs = $scope.$$childHead; cs; cs = cs.$$nextSibling) {
                if (cs.isOpen !== undefined) {
                    cs.isOpen = false;
                }
            }
            $scope.$apply();
        },

        removeSticky: function() {
            if (!this.isSticky) return;

            this.placeholder.hide();
            this.nav.removeClass('fix-nav');
            this.closeDropdowns();2

            this.isSticky = false;
        }
    }

    $(window).trigger('scroll.stickyNav');
}]);
//# sourceMappingURL=app.js.map