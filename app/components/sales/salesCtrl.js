app.controller('salesCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('app/data/products/products.json').success(function(data) {
            $scope.products = data;
            $scope.itemLength = data.length;
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

// app.constant('saleAnimateConfig', {
//     duration: 2000
// });

// app.animation('.sales-product', ['$timeout', 'saleAnimateConfig', function($timeout, saleAnimateConfig) {
//     return {
//         enter: function(element, done) {
//             var ind = element.attr('index');
//             var len = element.attr('item-length');
//             var delay = saleAnimateConfig.duration / len * (ind);
//             console.log(delay);
//             $timeout(function() {
//                 element.addClass('is-animated');
//                 done();
//             }, delay);
//         },
//         leave: function(element, done) {
//             var ind = element.attr('index');
//             var len = element.attr('item-length');
//             var delay = saleAnimateConfig.duration / len * (ind + 1);
//             $timeout(function() {
//                 element.removeClass('is-animated');
//                 done();
//             }, delay);
//         }
//     }
// }]);