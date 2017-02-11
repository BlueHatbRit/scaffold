let configure = function(grunt) {
    //require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-mocha-cli');

    let cfg = {
        mochacli: {
            options: {
                ui: 'bdd',
                reporter: grunt.option('reporter') || 'spec',
                timeout: '30000',
            },

            integration: {
                src: [
                    'test/integration/**/*_spec.js',
                    'test/integration/*_spec.js'
                ]
            }
        }
    };

    grunt.initConfig(cfg);

    grunt.registerTask('setTestEnv', 'Use "testing" config unless running on travis', () => {
        process.env.NODE_ENV = process.env.TRAVIS ? process.env.NODE_ENV : 'testing';
    });

    grunt.registerTask('test', 'Run tests',
        ['setTestEnv', 'mochacli:integration']
    );

    grunt.registerTask('default', 'Run tests',
        ['test']
    );
};

module.exports = configure;