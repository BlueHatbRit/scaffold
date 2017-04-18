const api = require('../../api');

const settings = {
    index: (req, res) => {
        return api.settings.index().then(settings => {
            res.render('settings', settings);
        });
    }
};

module.exports = settings;