'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var handlebarsEngine = require('yeoman-handlebars-engine');

var SpaProjectGenerator = yeoman.generators.Base.extend({
    constructor: function (args, options, config) {
        options.engine = handlebarsEngine;
        yeoman.generators.Base.apply(this, arguments);
    },

    init: function () {
        this.log(yosay('Welcome to the Spa Project generator!'));
        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.pkg = this.dest.readJSON('package.json');
                this.installDependencies();
            }
        });
    },

    askForAppName: function () {
        var done = this.async();
        var defaultAppName = getDefaultAppName();
        var prompts = [
            {
                name: 'appName',
                message: 'What is the name of this app?',
                default: defaultAppName
            }
        ];
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },

    app: function () {
        this.template('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
    },

    projectFiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('webpack.config.js', 'webpack.config.js');
    }
});

module.exports = SpaProjectGenerator;

function getDefaultAppName() {
    return __dirname.split('/').pop().replace(' ', '-');
}
