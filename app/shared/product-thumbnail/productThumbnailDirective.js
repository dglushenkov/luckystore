app.directive('productThumbnail', function() {
    return {
        restrict: 'EA',
        templateUrl: 'app/shared/product-thumbnail/productThumbnailTemplate.html',
        replace: true
    }
});