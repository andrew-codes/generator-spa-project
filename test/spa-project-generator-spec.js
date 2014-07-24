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
                .withPrompt({ appName: 'my-app', authorName: 'first last' })
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
                'webpack.config.js',
                'src/index.html'
            ];
            generatorRun.on('end', function () {
                assert.file(expected);
                done();
            });
        });
        it('populates the package.json with prompted data', function (done) {
            generatorRun.on('end', function () {
                assert.fileContent('package.json', /"name":\s*"my-app"/);
                assert.fileContent('package.json', /"author":\s*"first last"/);
                done();
            });
        });
    });
});
