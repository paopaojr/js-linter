'use strict';
(function($, app) {

    app.event = {
        beforeGetContent: 'beforeGetContent',
        afterGetContent: 'afterGetContent',

        emitBeforeGetContent: function() {
            $(document).trigger(app.event.beforeGetContent);
        },

        emitAfterGetContent: function() {
            $(document).trigger(app.event.afterGetContent);
        },
    };

})(jQuery, app);
