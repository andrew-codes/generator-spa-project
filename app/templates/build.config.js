'use strict';

module.exports = {
    dist: {
        path: './public',
        css: './public/css',
        vendor: './public/vendor',
        js: './public/js',
        images: './public/images'
    },
    src: {
        styles: './src/styles/app.styl',
        scripts: './src/app/main.js',
        images: './src/images/**/*.*'
    },
    tests: {
        unit: {
            config: './test/karma.config.unit.js'
        }
    },
    optimize: true
};