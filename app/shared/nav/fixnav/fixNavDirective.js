// Fix navigation default selectors & classname
app.constant('fixNavConfig', {
    navContainerSelector: '.main-nav-container',
    navPlaceholderSelector: '.main-nav-placeholder',
    fixNavClass: 'fix-nav'
});

// Fix navigation directive controller
app.controller('fixNavCtrl', ['$scope', 'fixNavConfig',
    function($scope, fixNavConfig) {
        var self = this;

        $scope.isFixNav = null;

        this.init = function() {
            self.nav = $(fixNavConfig.navContainerSelector);
            self.placeholder = $(fixNavConfig.navPlaceholderSelector);

            $(window).on('scroll', function() {
                var newIsFixNav = $(window).scrollTop() > getNavBottom();
                if (newIsFixNav != $scope.isFixNav) {
                    $scope.isFixNav = newIsFixNav;
                    $scope.$apply();
                }
            });
        };

        function getNavBottom() {
            var container = ($scope.isFixNav) ? self.placeholder : self.nav;
            var bottom = container.height() + container.offset().top;
            return bottom;
        };

        $scope.$watch('isFixNav', function(isFixNav) {
            if ($scope.isFixNav) {
                enableFix();
            } else {
                disableFix();
            }
        });

        function enableFix() {
            self.placeholder.height(self.nav.height());
            self.placeholder.css({
                marginTop: self.nav.css('margin-top'),
                marginBottom: self.nav.css('margin-bottom')
            })
            self.placeholder.show();
            self.nav.addClass(fixNavConfig.fixNavClass);
            closeDropdowns();
        }

        function disableFix() {
            if ($scope.isFixNav === null) return;
            self.placeholder.hide();
            self.nav.removeClass(fixNavConfig.fixNavClass);
            closeDropdowns();
        }

        function closeDropdowns() {
            for (var cs = $scope.$$childHead; cs; cs = cs.$$nextSibling) {
                if (cs.isOpen !== undefined) {
                    cs.isOpen = false;
                }
            }
        }
}]);

// Fix navigation directive
app.directive('fixNav', function() {
    return {
        restrict: 'A',
        controller: 'fixNavCtrl',
        link: function(scope, element, attr, fixNavCtrl) {
            fixNavCtrl.init();
        }
    }
});