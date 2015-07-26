// Initialize owl carousel with owlCarousel service and options in parent scope
app.directive('initOwlCarousel', ['owlCarousel', function(owlCarousel) {
    return function(scope, element, attr) {
        if (scope.$last) {
            owlCarousel.init(scope.owlCarouselOpt);
        }
    }
}]);

