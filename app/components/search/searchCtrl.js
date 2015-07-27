app.controller('searchCtrl', ['$scope', '$http', 'simpleFormService',
    function($scope, $http, simpleFormService) {
        simpleFormService.init();

        $http.get('app/data/products/products.json')
            .success(function(data) {
                $scope.products = data;
            })
}]);