'use strict';
(function(app) {
    app.page = {
        _pageMapping: {
            '1': 'page1',
            '2': 'page2',
        },

        isPageHasQuery: function() {
            return !!window.location.search;
        },

        getTotalPage: function() {
            return Object.keys(app.page._pageMapping).length;
        },

        getPageFromQuery: function() {
            var urlParams = new URLSearchParams(window.location.search);

            return parseInt(urlParams.get('page'));
        },

        getPageNameFromQuery: function() {
            var page = app.page.getPageFromQuery();

            return app.page._pageMapping[page];
        },

        navigateToPreviousPage: function() {
            var thisPage = app.page.getPageFromQuery();
            window.location = '?page=' + (thisPage - 1);
        },

        navigateToNextPage: function() {
            var thisPage = app.page.getPageFromQuery();
            window.location = '?page=' + (thisPage + 1);
        },
    };
})(app);
