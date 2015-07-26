app.controller('loginCtrl', ['$scope', '$http', '$modal', 
    function($scope, $http, $modal) {
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
    console.log(response);
    $scope.response = response;

    $scope.ok = function() {
        $modalInstance.close();
    }
}]);