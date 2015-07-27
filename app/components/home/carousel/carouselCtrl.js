app.controller('carouselCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('app/data/home-carousel-slides/slides.json').success(function(data) {
        $scope.slides = data;

        console.log($scope.$$childHead);
    });
}]);