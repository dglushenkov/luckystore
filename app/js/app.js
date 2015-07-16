$(function() {
    $(document).on('click.owl.carousel', '.js-home-products-carousel-prev', function() {
        owl.trigger('prev.owl.carousel');
    });

    $(document).on('click.owl.carouse', '.js-home-products-carousel-next', function() {
        owl.trigger('next.owl.carousel');
    });

    owlCarouselInit('.js-home-products-carousel');

    function owlCarouselInit(selector) {
        var owl = $(selector);

        owl.owlCarousel({
            loop: false,
            slideBy: 'page',
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    }

});

// Angular
var app = angular.module('luckystore', []);
