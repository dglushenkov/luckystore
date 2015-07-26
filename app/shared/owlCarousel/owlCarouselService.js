// Default owl carousel selector
app.constant('owlCarouselConfig', {
    carouselSelector: '.js-owl-carousel'
});

// Owl Carousel service
app.service('owlCarousel', ['owlCarouselConfig', function(owlCarouselConfig) {
    this.init = function(options, selector) {
        var selector = selector || owlCarouselConfig.carouselSelector;
        var owl = $(selector);

        owl.owlCarousel(options);

        $(selector + '-prev').on('click', function() {
            owl.trigger('prev.owl.carousel');
        });

        $(selector + '-next').on('click', function() {
            owl.trigger('next.owl.carousel');
        });
    }
}]);
