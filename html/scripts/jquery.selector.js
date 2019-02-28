'use strict';
(function($, Mustache) {
    /*
        options object example
        {
            data: {
                data: [
                    {
                        title: string,
                        value: string,
                        description: string,
                    },
                ],
                fieldName: string,
            }
            defaultSelect: number,
        }
    */
    $.fn.initSelector = function(options) {
        var $elm = this;

        if (options && options.data) {
            options.data.data = _addIndexToArrayOfObj(options.data.data);
            var colLength = 12 / options.data.data.length;
            if (colLength < 4) {
                colLength = 4;
            }
            options.data.colLength = colLength;

            var template = $('#selector-template').html();
            Mustache.parse(template);
            var rendered = Mustache.render(template, options.data);
            $elm.html(rendered);
        }

        var $cols = $elm.find('.selector-template--col-inner');
        var $value = $elm.find('.selector-template--value');
        var selectedClass = 'selector-template--col-inner__selected';
        var value = $value.val();

        if (options && options.defaultSelect) {
            var index = parseInt(options.defaultSelect);
            var $col = $cols.eq(index);
            $col.addClass(selectedClass);
            $value.val($col.data('value'));
        }

        $cols.on('click', function() {
            var $clickedItem = $(this);
            $cols.removeClass(selectedClass);
            $clickedItem.addClass(selectedClass);
            $value.val($clickedItem.data('value'));
        });

        return {
            getValue: function() {
                return $value.val();
            },

            setValue: function(value) {
                if (value) {
                    var $col = $elm.find('div[data-value="' + value + '"]');
                    $cols.removeClass(selectedClass);
                    $col.addClass(selectedClass);
                }
            }
        };
    };

    var _addIndexToArrayOfObj = function(obj) {
        return obj.map(function(obj, i) {
            obj.index = i + 1;

            return obj;
        });
    };
})(jQuery, Mustache);
