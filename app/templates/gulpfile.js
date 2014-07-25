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
var params = require('yargs').argv;
var htmlMin = require('gulp-htmlmin');
var cssMin = require('gulp-minify-css');
var jsMin = require('gulp-uglify');
var extend = require('extend');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc'));
var buildConfig = getBuildConfig();

gulp.task('dev', ['build'], function () {
    connect().use(serveStatic(path.join(__dirname, buildConfig.dist.path))).listen(8081);
});

gulp.task('build', ['assemble-html', 'assemble-styles', 'assemble-scripts', 'assemble-bower-files', 'assemble-images'], function () {

});

gulp.task('assemble-html', ['clean'], function () {
    var stream = gulp.src('./src/index.html');
    if (buildConfig.optimize) {
        stream = optimizeHtml(stream);
    }
    return stream.pipe(gulp.dest(buildConfig.dist.path));
});

gulp.task('assemble-images', ['clean'], function () {
    var stream = gulp.src(buildConfig.src.images);
    if (buildConfig.optimize){
        stream = optimizeImages(stream);
    }
    return stream.pipe(gulp.dest(buildConfig.dist.images));
});

gulp.task('assemble-styles', ['clean'], function () {
    var stream = assembleStyles();
    if (buildConfig.optimize) {
        stream = optimizeCss(stream);
    }
    return stream
        .pipe(rename('index.css'))
        .pipe(gulp.dest(buildConfig.dist.css));
});

gulp.task('assemble-scripts', ['clean'], function () {
    var stream = assembleScripts();
    if (buildConfig.optimize) {
        stream = optimizeJs(stream);
    }
    return stream
        .pipe(rename('index.js'))
        .pipe(gulp.dest(buildConfig.dist.js));
});

gulp.task('assemble-bower-files', ['clean'], function () {
    var stream = gulp.src(bowerFiles(), {base: buildConfig.bowerPath});
    return stream
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

function optimizeHtml(stream) {
    return stream
        .pipe(htmlMin({collapseWhitespace: true}));
}

function optimizeCss(stream) {
    return stream
        .pipe(cssMin());
}

function optimizeJs(stream) {
    return stream
        .pipe(jsMin());
}

function getBuildConfig() {
    var buildConfig = {
        dist: {
            path: './public',
            css: './public/css',
            vendor: './public/vendor',
            js: './public/js',
            images: './public/images'
        },
        bowerPath: bowerConfig.directory,
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
        optimize: false
    };
    if (!params.buildConfigFile || !fs.existsSync(params.buildConfigFile)) {
        return buildConfig;
    }
    var loadedBuildConfig = require(params.buildConfigFile);
    return extend(buildConfig, loadedBuildConfig);
}

function optimizeImages(stream) {
    return stream
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }));
}