module.exports = function() {
    var utils = require('regions-extras');
    var template = require('__PATH__');
    var renderedViews = [];

    if(module.hot) {
        module.hot.accept('__PATH__', function() {
            template = require('__PATH__');
            renderedViews.forEach(function(view) {
                view.render();
            });
        });
    }
    return function(data, options) {
        var view;
        if(options) {
            options.hash = options.hash || {};
            view = utils.getView(null, options)
        }
        if(view) {
            view.on('render', function() {
                renderedViews.push(view);
            });
            view.on('destroy', function() {
                renderedViews = renderedViews.filter(function(item) {
                    return item !== view;
                });
            });
        }
        return template.apply(null, arguments);
    };
};
