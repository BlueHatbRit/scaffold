const hbs = require('express-hbs');

function injectHtml(htmlString) {
    return new hbs.SafeString(htmlString);
}

module.exports = injectHtml;