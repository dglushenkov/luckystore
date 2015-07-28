app.directive('productThumbnail', function() {
    return {
        restrict: 'EA',
        templateUrl: 'app/shared/directives/product-thumbnail/productThumbnailTemplate.html',
        replace: true
    }
});