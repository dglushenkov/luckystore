app.controller('navbarCtrl', ['$scope', function($scope) {
    $scope.isCollapsed = true;

    $scope.toggleNav = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
    }
}]);
