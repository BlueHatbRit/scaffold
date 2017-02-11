let Nconf = require('nconf');
let nconf = new Nconf.Provider();
let path = require('path');
let env = process.env.NODE_ENV || 'development';

nconf.file(path.join(process.cwd(), 'config.' + env + '.json'));

module.exports = nconf;
