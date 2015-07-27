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

        // Get title of current view
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
