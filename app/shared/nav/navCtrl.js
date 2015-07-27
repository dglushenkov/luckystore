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
