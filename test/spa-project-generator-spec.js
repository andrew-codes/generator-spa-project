/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var chai = require('chai');
chai.should();

describe('spa-project generator', function () {
    describe('when requiring the generator', function () {
        var app;
        beforeEach(function (done) {
            app = require('../app');
            done();
        });
        it('it should be defined', function () {
            app.should.not.equal(undefined);
        });
    });

    describe('when running the generator', function () {
        var generatorRun;
        beforeEach(function (done) {
            var destinationDirectory = path.join(__dirname, '../temp');
            generatorRun = helpers.run(path.join(__dirname, '../app'))
                .inDir(destinationDirectory)
                .withPrompt({
                    appName: 'my-app',
                    authorName: 'first last',
                    authorEmail: 'email@email.com'
                })
                .on('ready', function (generator) {
                    generator.destinationRoot(destinationDirectory);
                    done();
                });
        });
        it('creates the appropriate files', function (done) {
            var expected = [
                'package.json',
                'bower.json',
                '.jshintrc',
                '.editorconfig',
                '.bowerrc',
                '.gitignore',
                'gulpfile.js',
                'src/index.html',
                'src/styles/app.styl',
                'test/karma.config.unit.js',
                'example.env.build.config.js'
            ];
            generatorRun.on('end', function () {
                assert.file(expected);
                done();
            });
        });
        it('populates the package.json with prompted data', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('package.json', /"name"\s*:\s*"my-app"/);
                assert.fileContent('package.json', /"author"\s*:\s*"first last"/);
                done();
            });
        });
        it('populates the bower.json with prompted data', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"name"\s*:\s*"my-app"/);
                assert.fileContent('bower.json', /"authors"(\s|\n|\r|\t)*:(\s|\n|\r|\t)*\[(\s|\n|\r|\t)*"first last [<]email@email[.]com[>]"(\s|\n|\r|\t)*\]/);
                done();
            });
        });
        it('includes font-awesome', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"font[-]awesome"/);
                assert.fileContent('src/index.html', /href=".*\/font[-]awesome[.]css"/);
                done();
            });
        });
        it('includes normalize', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"normalize[-]css"/);
                assert.fileContent('src/index.html', /href=".*\/normalize[.]css"/);
                done();
            });
        });
        it('includes q', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"q"/);
                assert.fileContent('src/index.html', /src=".*\/q[.]js"/);
                done();
            });
        });
        it('includes signals-js', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"signals"/);
                assert.fileContent('src/index.html', /src=".*\/signals[.]js"/);
                done();
            });
        });
        it('includes momentjs', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"momentjs"/);
                assert.fileContent('src/index.html', /src=".*\/moment[.]js"/);
                done();
            });
        });
        it('includes semantic grid', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('bower.json', /"semantic[-]grid"/);
                assert.fileContent('src/styles/app.styl', /bower_components\/semantic-grid\/stylesheets\/styl\/grid/);
                done();
            });
        });
    });
});
