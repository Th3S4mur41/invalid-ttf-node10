/*eslint-env node*/
'use strict';

// This is Grunt configuration file
// Grunt is used for pre-processing static assets so they can be served directly by nginx

module.exports = function (grunt) {
    // Load plugins
    const path = require('path'),
        npmTasks = [
            'grunt-webfonts'
        ];
    npmTasks.forEach(grunt.loadNpmTasks);

    ///////////////////////////////////////////////////////////////////////////
    // Configuration
    ///////////////////////////////////////////////////////////////////////////
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webfont: {
            icons: {
                src: 'svg/**/*.svg',
                dest: 'dist',
                destLess: 'dist',
                options: {
                    autoHint: false, // run without installing ttfautohint
                    engine: 'node',
                    font: 'svg-icons',
                    fontFamilyName: 'SVGIcons',
                    //fontPathVariables: true,
                    hashes: false,
                    htmlDemo: true,
                    normalize: true,
                    optimize: true,
                    order: ['woff2', 'woff', 'ttf'],
                    rename: function (name) {
                        // consistently use - instead of _
                        // make sure to not duplicate the prefix "icon-"
                        return path.basename(name).replace(new RegExp('_', 'g'), '-').replace('icon-', '');
                    },
                    stylesheets: ['less'],
                    syntax: 'bootstrap',
                    templateOptions: {
                        classPrefix: 'svg-icon-'
                    },
                    types: ['ttf', 'woff2', 'woff']
                }
            }
        }
    });

    ///////////////////////////////////////////////////////////////////////////
    // Support tasks
    ///////////////////////////////////////////////////////////////////////////
    grunt.registerTask('default', [
        'webfont'
    ]);
};
