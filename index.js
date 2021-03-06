var postcss = require('postcss');

var bgUrlRegex = /url\(\s?['"]?(.*?)['"]?\s?\)/g;
var protocolRegex = /(https?:)?\/\/|data:/g;

module.exports = postcss.plugin('postcss-shopify-settings-variables',
  function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {

        // Transform CSS AST here
        css.walk(function (node) {
            if ( node.type === 'decl' ) {
                if ( node.value.indexOf('$(') >= 0 ) {
                    node.value = node.value
                        .replace(/^([^\$]*)(\$\()([^\)]+)(\))(.*)$/,
                            function(match, $1, $2, $3, $4, $5) {
                                return $1 + '{{ ' + $3 + ' }}' + $5;
                            });
                }
            }
        });
    };
});
