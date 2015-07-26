// Home view controller
app.controller('homeCtrl', ['$scope', '$http', '$routeParams', '$modal',
    function($scope, $http, $routeParams, $modal) {
        // Products data
        $http.get('app/data/products/products.json').success(function(data) {
            $scope.products = data;
        });

        // Emulate newsletter response from server
        $scope.newsletter = function() {
            $http.get('app/data/newsletter/newsletter.json').success(function(data) {
                $scope.res = data;
                $('.js-response-modal').modal('show');
            });
        };

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


