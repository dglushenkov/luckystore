app.controller('ContactsCtrl', ['$scope', function($scope) {
    var mapCanvas = document.querySelector('.js-google-maps');
    var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}]);