'use strict';

var gulp = require('gulp');
var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');
var bowerFiles = require('main-bower-files');
var fs = require('fs');
var rename = require('gulp-rename');
var karma = require('karma').server;
var browserify = require('gulp-browserify');
var karmaParseConfig = require('karma/lib/config').parseConfig;

var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc'));
var buildConfig = {
    dist: {
        path: './public',
        css: './public/css',
        vendor: './public/vendor',
        js: './public/js'
    },
    bowerPath: bowerConfig.directory,
    src: {
        styles: './src/styles/app.styl',
        scripts: './src/app/main.js'
    },
    tests: {
        unit: {
            config: './test/karma.config.unit.js'
        }
    }
};

gulp.task('dev', ['assemble'], function () {
    connect().use(serveStatic(path.join(__dirname, buildConfig.dist.path))).listen(8081);
});

gulp.task('assemble', ['clean', 'assemble-styles', 'assemble-scripts', 'assemble-bower-files'], function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(buildConfig.dist.path));
});

gulp.task('assemble-styles', ['clean'], function () {
    return assembleStyles()
        .pipe(rename('index.css'))
        .pipe(gulp.dest(buildConfig.dist.css));
});

gulp.task('assemble-scripts', ['clean'], function () {
    return assembleScripts()
        .pipe(rename('index.js'))
        .pipe(gulp.dest(buildConfig.dist.js));
});

gulp.task('assemble-bower-files', ['clean'], function () {
    return gulp.src(bowerFiles(), {base: buildConfig.bowerPath})
        .pipe(gulp.dest(buildConfig.dist.vendor));
});

gulp.task('clean', [], function () {
    return gulp.src(buildConfig.dist.path, {read: false})
        .pipe(clean());
});

gulp.task('tests-unit', [], function (done) {
    var config = karmaParseConfig(path.resolve(buildConfig.tests.unit.config), {});
    karma.start(config, done);
});

function assembleStyles() {
    return gulp.src(buildConfig.src.styles)
        .pipe(stylus())
        .pipe(prefix("last 1 version", "> 1%", "ie 9"));
}

function assembleScripts() {
    return gulp.src(buildConfig.src.scripts)
        .pipe(browserify());
}