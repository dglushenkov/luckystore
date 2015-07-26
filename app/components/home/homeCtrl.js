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
                    $scope.signUpRes = data;

                    var modal = $modal.open({
                        templateUrl: 'homeSignUpResponse',
                        controller: 'homeSignUpResponseCtrl',
                        resolve: {
                            signUpRes: function() {
                                return $scope.signUpRes;
                            }
                        }
                    });
            })
        }
}]);

// Modal controller
app.controller('homeSignUpResponseCtrl', ['$scope', '$modalInstance', 'signUpRes', function($scope, $modalInstance, signUpRes) {
    $scope.signUpRes = signUpRes;

    $scope.ok = function() {
        $modalInstance.close();
    }
}]);


