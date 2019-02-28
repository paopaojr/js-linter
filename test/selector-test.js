'use strict';
(function($, QUnit) {
    window.testSelector = function() {
        $('#app--test-template').append('div').load('../html/partials/jquery.selector.html', function() {
            _testSelector();
        });
    }

    function _testSelector() {
        var $selector = $('#app--selector').initSelector({
            defaultSelect: 1,
            data: {
                data: [
                    {
                        title: 'Title 1',
                        value: '15',
                        description: 'Description 1',
                    },
                    {
                        title: 'Title 2',
                        value: '20',
                        description: 'Description 2',
                    },
                    {
                        title: 'Title 3',
                        value: '25',
                        description: 'Description 3',
                    },
                ],
                fieldName: 'selector',
            },
        });

        QUnit.test('render selector should have correct attribute', function(assert) {

            assert.equal($('.selector-template--title').eq(0).text(), 'Title 1');
            assert.equal($('.selector-template--description').eq(1).text(), 'Description 2');
            assert.equal($('.selector-template--col-inner').eq(2).data('value'), '25');
            assert.ok($('.selector-template--col-inner').eq(1).hasClass('selector-template--col-inner__selected'));
            assert.equal($('.selector-template--value').val(), '20');
        });

        QUnit.test('change state of selector should update value & style', function(assert) {

            $('.selector-template--col-inner').eq(2).click();
            assert.ok($('.selector-template--col-inner').eq(2).hasClass('selector-template--col-inner__selected'));
            assert.equal($('.selector-template--value').val(), '25');

            $('.selector-template--col-inner').eq(0).click();
            assert.ok($('.selector-template--col-inner').eq(0).hasClass('selector-template--col-inner__selected'));
            assert.equal($('.selector-template--value').val(), '15');
        });
    }
})(jQuery, QUnit);
