//=======================================================================
// DOM
//=======================================================================
$(function() {
    $('.js-click-prevent-defaults').on('click', function(e) {
        e.preventDefault();
    });

    $(window).on('scroll.stickyNav', function(e) {
        if ($(window).scrollTop() > stickyNav.getNavBottom()) {
            stickyNav.makeSticky();
        } else {
            stickyNav.removeSticky();
        }
    });

    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e) {
        var menu = $(this).find('.dropdown-menu').first().stop(true, true);
        menu.addClass('slidingUp')
            .slideUp(150, function() {
                $(this).removeClass('slidingUp');
            })
    });


    var stickyNav = {
        isSticky: false,
        nav: $('.main-nav-container'),
        placeholder: $('.main-nav-placeholder'),

        getNavBottom: function() {
            var container = (this.isSticky) ? this.placeholder : this.nav;
            var bottom = container.height() + container.offset().top;
            return bottom;
        },

        makeSticky: function() {
            if (this.isSticky) return;

            this.placeholder.height(this.nav.height());
            this.placeholder.css({
                marginTop: this.nav.css('margin-top'),
                marginBottom: this.nav.css('margin-bottom')
            })
            this.placeholder.show();
            this.nav.addClass('fix-nav');
            this.closeDropdowns();

            this.isSticky = true;
        },

        closeDropdowns: function() {
            this.nav.find('.dropdown-toggle').each(function() {
                var $this = $(this);
                if ($this.closest('.dropdown').hasClass('open')) {
                    console.log('isVisible');
                    $this.dropdown('toggle');
                }
            });
        },

        removeSticky: function() {
            if (!this.isSticky) return;

            this.placeholder.hide();
            this.nav.removeClass('fix-nav');
            this.closeDropdowns();2

            this.isSticky = false;
        }
    }

    $(window).trigger('scroll.stickyNav');
});

//=======================================================================
// Angular
//=======================================================================
var app = angular.module('luckystore', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'components/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/sales/category/:category/tag/:tag', {
                templateUrl: 'components/sales/sales.html',
                controller: 'SalesCtrl'
            })
            .when('/contacts', {
                templateUrl: 'components/contacts/contacts.html',
                controller: 'ContactsCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
}]);

