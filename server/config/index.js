let Nconf = require('nconf');
let nconf = new Nconf.Provider();
let path = require('path');
let env = process.env.NODE_ENV || 'development';

const configFile = path.join(process.cwd(), 'config.' + env + '.json');

// Feed from environment variables first,
// then the config file
nconf.env(':').file(configFile);

module.exports = nconf;
