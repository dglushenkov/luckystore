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