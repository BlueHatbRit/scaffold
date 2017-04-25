let Nconf = require('nconf');
let nconf = new Nconf.Provider();
let path = require('path');
let env = process.env.NODE_ENV || 'development';

const configFile = path.join(process.cwd(), 'config.' + env + '.json');

// Env first then file
nconf.env('__').file(configFile);

function convertClearDbToConfig(clearDbUrl) {
    str = clearDbUrl.substr(8);
    let database = {};

    let res = str.split(':');
    database.user = res[0];

    res = res[1].split('@');
    database.password = res[0];

    res = res[1].split('/');
    database.host = res[0];

    res = res[1].split('?');
    database.database = res[0];

    database.charset = 'utf8';

    return database;
}

if (nconf.get('HEROKU')) {
    // Port
    nconf.set('port', nconf.get('PORT'));

    // Redis
    nconf.set('session:store:url', nconf.get('REDIS_URL'));

    // MySQL
    nconf.set('database:client', 'mysql');
    let clearDbUrl = nconf.get('CLEARDB_DATABASE_URL');
    let dbObject = convertClearDbToConfig(clearDbUrl);
    nconf.set('database:connection', dbObject);

    // If no web session secret was set, set one and place a warning in the logs
    if (!nconf.get('session:secret')) {
        const crypto = require('crypto');
        const str = crypto.randomBytes(64).toString('hex');

        nconf.set('session:secret', str);

        console.warn('WARNING: session_secret environment variable not set!');
    }

    // If no API secret was set, set one and place a warning in the logs
    if (!nconf.get('auth:secret')) {
        const crypto = require('crypto');
        const str = crypto.randomBytes(64).toString('hex');

        nconf.set('auth:secret', str);

        console.warn('WARNING: auth_secret environment variable not set!');
    }

    console.log('Configured for Heroku');
}

module.exports = nconf;
