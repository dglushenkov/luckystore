app.service('simpleFormService', function() {
    this.init = function() {
        var block = $('.simple-form-block');
        block.find('input, button')
            .on('blur', function(e) {
                var relatedTarget = $(e.relatedTarget);
                if (relatedTarget.parents('.simple-form-block').length) {
                    return;
                }
                block.removeClass('hasFocus');
            })
            .on('focus', function(e) {
                block.addClass('hasFocus');
            })
    }
});