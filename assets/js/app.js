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


app.controller('contactsCtrl', ['$scope', function($scope) {
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    $scope.options = {
        scrollwheel: false
    };
}]);
// Home view controller
app.controller('homeCtrl', ['$scope', '$http', '$routeParams', '$modal', 'simpleFormService',
    function($scope, $http, $routeParams, $modal, simpleFormService) {
        simpleFormService.init();

        // Products data
        $http.get('app/data/products/products.json').success(function(data) {
            $scope.products = data;
        });

        // Options for initOwlCarousel directive
        $scope.owlCarouselOpt = {
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
        };

        // Modal newsletter sign-up
        $scope.signUp = function() {
            $http.get('app/data/newsletter/newsletter.json')
                .success(function(data) {
                    $scope.response = data;

                    var modal = $modal.open({
                        templateUrl: 'app/shared/templates/sampleResponse.html',
                        controller: 'homeSignUpResponseCtrl',
                        resolve: {
                            response: function() {
                                return $scope.response;
                            }
                        }
                    });
            })
        }
}]);

// Modal controller
app.controller('homeSignUpResponseCtrl', ['$scope', '$modalInstance', 'response', function($scope, $modalInstance, response) {
    $scope.response = response;

    $scope.ok = function() {
        $modalInstance.close();
    }
}]);



app.controller('loginCtrl', ['$scope', '$http', '$modal', 'simpleFormService',
    function($scope, $http, $modal, simpleFormService) {
        simpleFormService.init();
        // Login action
        $scope.login = function() {
            $http.get('app/data/login/login.json')
                .success(function(data) {
                    $scope.response = data;

                    var modal = $modal.open({
                        templateUrl: 'app/shared/templates/sampleResponse.html',
                        controller: 'loginResponseCtrl',
                        resolve: {
                            response: function() {
                                return $scope.response;
                            }
                        }
                    });
            })
        }
}]);

// Modal controller
app.controller('loginResponseCtrl', ['$scope', '$modalInstance', 'response', function($scope, $modalInstance, response) {
    $scope.response = response;

    $scope.ok = function() {
        $modalInstance.close();
    }
}]);
app.controller('salesCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('app/data/products/products.json').success(function(data) {
            $scope.products = data;
            $scope.itemLength = data.length;
        });

        $scope.category = $routeParams.category;
        $scope.tag = $routeParams.tag;

        // Filter for current view
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

        // Get title for current view
        $scope.getTitle = function() {
            var category = $routeParams.category,
                tag = $routeParams.tag,
                title;

            if (category == 'all') {
                title = 'Sales';
            } else if (tag == 'all') {
                title = category.replace(/-/, ' ');
                title = title.charAt(0).toUpperCase() + title.slice(1);
            } else {
                title = category.charAt(0).toUpperCase() + category.slice(1) + ' ' + tag;
            }

            return title;
        }
}]);

app.controller('searchCtrl', ['$scope', '$http', 'simpleFormService',
    function($scope, $http, simpleFormService) {
        simpleFormService.init();

        $http.get('app/data/products/products.json')
            .success(function(data) {
                $scope.products = data;
            })
}]);
app.controller('navbarCtrl', ['$scope', '$location', '$routeParams',
    function($scope, $location, $routeParams) {
    $scope.isCollapsed = true;

    $scope.toggleNav = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.isActive = function(viewLocation, isCategory) {
        if (isCategory) {
            var category = $routeParams.category;
            if (!category) return false;

            category = category.replace(/-\S+/, '');
            return viewLocation === '/' + category;
        } else {
            return viewLocation === $location.path();
        }
    }
}]);

// Initialize owl carousel with owlCarousel service and options in parent scope
app.directive('initOwlCarousel', ['owlCarousel', function(owlCarousel) {
    return function(scope, element, attr) {
        if (scope.$last) {
            owlCarousel.init(scope.owlCarouselOpt);
        }
    }
}]);


// Default owl carousel selector
app.constant('owlCarouselConfig', {
    carouselSelector: '.js-owl-carousel'
});

// Owl Carousel service
app.service('owlCarousel', ['owlCarouselConfig', function(owlCarouselConfig) {
    this.init = function(options, selector) {
        var selector = selector || owlCarouselConfig.carouselSelector;
        var owl = $(selector);

        owl.owlCarousel(options);

        $(selector + '-prev').on('click', function() {
            owl.trigger('prev.owl.carousel');
        });

        $(selector + '-next').on('click', function() {
            owl.trigger('next.owl.carousel');
        });
    }
}]);

app.directive('productThumbnail', function() {
    return {
        restrict: 'EA',
        templateUrl: 'app/shared/product-thumbnail/productThumbnailTemplate.html',
        replace: true
    }
});
app.controller('carouselCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('app/data/home-carousel-slides/slides.json').success(function(data) {
        $scope.slides = data;
    });

    $scope.interval = 4000;
}]);
app.directive('clover', function() {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'app/shared/directives/clover/cloverTemplate.html'
    }
})
// Fix navigation default selectors & classname
app.constant('fixNavConfig', {
    navContainerSelector: '.main-nav-container',
    navPlaceholderSelector: '.main-nav-placeholder',
    fixNavClass: 'fix-nav'
});

// Fix navigation directive controller
app.controller('fixNavCtrl', ['$scope', 'fixNavConfig',
    function($scope, fixNavConfig) {
        var self = this;

        $scope.isFixNav = null;

        this.init = function() {
            self.nav = $(fixNavConfig.navContainerSelector);
            self.placeholder = $(fixNavConfig.navPlaceholderSelector);

            $(window).on('scroll', function() {
                var newIsFixNav = $(window).scrollTop() > getNavBottom();
                if (newIsFixNav != $scope.isFixNav) {
                    $scope.isFixNav = newIsFixNav;
                    $scope.$apply();
                }
            });
        };

        function getNavBottom() {
            var container = ($scope.isFixNav) ? self.placeholder : self.nav;
            var bottom = container.height() + container.offset().top;
            return bottom;
        };

        $scope.$watch('isFixNav', function(isFixNav) {
            if ($scope.isFixNav) {
                enableFix();
            } else {
                disableFix();
            }
        });

        function enableFix() {
            self.placeholder.height(self.nav.height());
            self.placeholder.css({
                marginTop: self.nav.css('margin-top'),
                marginBottom: self.nav.css('margin-bottom')
            })
            self.placeholder.show();
            self.nav.addClass(fixNavConfig.fixNavClass);
            closeDropdowns();
        }

        function disableFix() {
            if ($scope.isFixNav === null) return;
            self.placeholder.hide();
            self.nav.removeClass(fixNavConfig.fixNavClass);
            closeDropdowns();
        }

        function closeDropdowns() {
            for (var cs = $scope.$$childHead; cs; cs = cs.$$nextSibling) {
                if (cs.isOpen !== undefined) {
                    cs.isOpen = false;
                }
            }
        }
}]);

// Fix navigation directive
app.directive('fixNav', function() {
    return {
        restrict: 'A',
        controller: 'fixNavCtrl',
        link: function(scope, element, attr, fixNavCtrl) {
            fixNavCtrl.init();
        }
    }
});
app.service('simpleFormService', function() {
    this.init = function() {
        var block = $('.simple-form-block');
        block.find('input, button')
            .on('blur', function(e) {
                var relatedTarget = $(e.relatedTarget);
                if (relatedTarget.parents('.simple-form-block').length) {
                    return;
                }
                block.removeClass('hasFocus');
            })
            .on('focus', function(e) {
                block.addClass('hasFocus');
            })
    }
});
//# sourceMappingURL=app.js.map