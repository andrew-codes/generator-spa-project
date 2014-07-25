var bowerMainFiles = require('main-bower-files');
var testFiles = ['./unit/**/*-spec.js'];
var bowerFiles = getThirdPartyDependencies();
var files = [].concat(bowerFiles, testFiles);

module.exports = function(config) {
    config.set({
        basePath: './',

        files: files,

        autoWatch: false,
        singleRun: true,
        colors: true,

        frameworks: ['mocha', 'commonjs', 'chai', 'sinon'],

        browsers: ['Chrome'],
        reports: [
            'progress',
            'junit'
        ],
        plugins: [
            'karma-junit-reporter',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-commonjs-plus',
            'karma-chai',
            'karma-sinon',
            'karma-react-jsx-preprocessor'
        ],
        preprocessors: {
            '**/*.js': ['commonjs'],
            '**/*.jsx': ['react-jsx']
        },
        junitReporter: {
            outputFile: 'test/out/unit.xml',
            suite: 'unit'
        },
        client: {
            mocha: {
                ui: 'bdd'
            }
        }
    });
};

function getThirdPartyDependencies() {
    var nodeDependencies = ['../node_modules/q/q.js'];
    var bowerFiles = [];
    var jsOnlyBowerFiles = bowerMainFiles()
        .filter(function (item) {
            return item.substr(-3, 3) === '.js';
        });
    jsOnlyBowerFiles.forEach(function(item){
        bowerFiles.push('../'+item);
    });
    return [].concat(nodeDependencies, bowerFiles);
}
