app.controller('carouselCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('app/data/slides/slides.json').success(function(data) {
        $scope.slides = data;
    });
}]);