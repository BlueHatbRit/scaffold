const settingsCache = require('../../settings').cache;

const getSiteName = function() {
    return settingsCache.get('name');
}

module.exports = getSiteName;