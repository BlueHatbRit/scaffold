const fs = require('fs');

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
            },

            single: {}
        }
    };

    grunt.initConfig(cfg);

    grunt.registerTask('setTestEnv', 'Use "testing" config unless running on travis', () => {
        process.env.NODE_ENV = process.env.TRAVIS ? process.env.NODE_ENV : 'testing';
    });

    grunt.registerTask('test', 'Run a specific spec file from the tests/ directory', (test) => {
        if (!test) {
            grunt.fail.fatal('No spec file/directory provided');
        }

        if (!test.match(/test/) && !test.match(/server/)) {
                test = 'test/' + test;
            }

            // Test a directory
            if (!test.match(/.js/)) {
                test += '/**';
            } else if (!fs.existsSync(test)) {
                grunt.fail.fatal('Spec file does not exist!');
            }

            cfg.mochacli.single.src = [test];
            grunt.initConfig(cfg);
            grunt.task.run('setTestEnv', 'mochacli:single');
    });

    grunt.registerTask('test-all', 'Run all tests',
        ['setTestEnv', 'mochacli:integration']
    );

    grunt.registerTask('default', 'Run tests',
        ['test-all']
    );
};

module.exports = configure;