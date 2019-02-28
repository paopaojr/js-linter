(function($, app) {
    var init = function() {
        includeContent();
    };

    var includeContent = function() {
        app.event.emitBeforeGetContent();

        if (!app.page.isPageHasQuery()) {
            return window.location = '/?page=1';
        }

        $('#app--content').load('contents/' + app.page.getPageNameFromQuery() + '.html', function(request, status) {
            if (status === 'error') {
                return document.write('Page not exist');
            }

            app.event.emitAfterGetContent();
            displayContent();
        });
    };

    $(function() {
        init();
    });
})(jQuery, app);
