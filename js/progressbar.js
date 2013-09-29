!function ($) {

    "use strict";

    // PROGRESSBAR CLASS DEFINITION
    // ============================

    var Progressbar = function (element, options) {
        this.options = options;
        this.$element = $(element);

        this.init(element, options);
    }

    Progressbar.DEFAULTS = {
        level: 'success'
    }

    Progressbar.prototype.init = function (element, options) {
        this.options = this.getOptions(options);

        this.design(this.options.level);
    }

    Progressbar.prototype.getOptions = function (options) {
        options = $.extend({}, Progressbar.DEFAULTS, this.$element.data(), options);

        return options
    }

    Progressbar.prototype.design = function (level) {
        var $div = this.$element.find('div');
        $div.removeClass('progress-bar-success');
        $div.removeClass('progress-bar-info');
        $div.removeClass('progress-bar-warning');
        $div.removeClass('progress-bar-danger');
        $div.addClass('progress-bar-' + level);
    }

    Progressbar.prototype.refresh = function (value) {
        var $div = this.$element.find('div');
        var $span = $div.find('span');
        $div.attr('aria-valuenow', value);
        $div.css('width', value + '%');
        $span.text(value + '% Complete');
    }

    Progressbar.prototype.finish = function () {
        this.refresh(100);
    }

    Progressbar.prototype.reset = function () {
        this.refresh(0);
    }

    // PROGRESSBAR PLUGIN DEFINITION
    // =============================

    $.fn.progressbar = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('jbl.progressbar'),
                options = $.extend({}, Progressbar.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('jbl.progressbar', (data = new Progressbar(this, options)));
            if (typeof option == 'string') data[option]();
            if (typeof option == 'number') data.refresh(option);
        })
    };

    // PROGRESSBAR DATA-API
    // ====================

    $(document).on('click.jbl.progressbar.data-api', '[data-toggle="progressbar"]', function (e) {
        var $this = $(this);
        var $target = $($this.data('target'));
        var value = $this.data('value');

        e.preventDefault();

        $target.progressbar(value);
    });

}(window.jQuery);
