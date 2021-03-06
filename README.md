# generator-spa-stack [![Build Status](https://secure.travis-ci.org/andrew-codes/generator-spa-project.png?branch=master)](https://travis-ci.org/andrew-codes/generator-spa-project)

> [Yeoman](http://yeoman.io) generator for creating a single-page application with unit and e2e testing integrated and 
utilizing best practices for react, flux, and other front-end frameworks.

## Technology Stack

- [bower](http://bower.io)

**Unit Testing**
- [mocha](https://github.com/visionmedia/mocha)
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/cjohansen/Sinon.JS)
- [karma](https://github.com/karma-runner/karma)

**End-to-End Testing**
- [nightwatchjs](https://github.com/beatfactor/nightwatch) (*coming soon*)

**Build Automation**
- [browserify](https://github.com/substack/node-browserify)
- [gulp](https://github.com/gulpjs/gulp)
- [CSS auto-prefixer](https://github.com/ai/autoprefixer)
- CSS, HTML, JavaScript, image minification
- CDN support for third-party scripts

**UI**
- [flux](http://facebook.github.io/react/docs/flux-overview.html)
- [react](https://github.com/facebook/react)
- [stylus](https://github.com/LearnBoost/stylus)
- [font awesome](https://github.com/FortAwesome/Font-Awesome)
- [normalize](https://github.com/necolas/normalize.css)
- [semantic grid system](https://github.com/twigkit/semantic.gs)

**Routing**
- [crossroads](https://github.com/millermedeiros/crossroads.js) (*coming soon*)
- [history.js](https://github.com/browserstate/history.js) (*coming soon*)

**Miscellaneous**
- [q](https://github.com/kriskowal/q)
- [signal-js](https://github.com/millermedeiros/js-signals)
- [momentjs](https://github.com/moment/moment/)


# Generated Project

## Project Structure

```
.
|-- src
|    |-- app
|        |-- actions
|        |-- components
|        |-- dispatcher
|        |-- lib
|        |-- stores
|    |-- images
|    |-- styles
|        |-- partials
|        +-- app.styl
|    +-- index.html
|-- test
|   |-- unit
|        |-- lib
|            +-- {{unit being tested}}-spec.js
|   |-- e2e
+-- .bowerrc
+-- .jshintrc
+-- bower.json
+-- gulpfile.js
+-- package.json
```

### Build Output Structure

```
.
|-- public
|    |-- images
|    |-- js
|        +-- index.js
|    |-- styles
|        +-- index.css
|    |-- vendor
|        |-- {{bower third party dependency}}
             +-- {{bower main files}}
|    +-- index.html
```

## Usage: gulp Tasks

To run the site, use the following command

```bash
gulp dev
```

To run all tests, use the following command

```bash
gulp tests
```

To run only unit tests, use the following command

```bash
gulp tests-unit
```

To run only end-to-end tests, use the following command

```bash
gulp tests-e2e
```

To create a development build, use the following command

```bash
gulp build
```

### Build Customization
Any of the above accepts an optional CLI parameter to configure to build. An example is generated and named `example.env.build.config.js` and is located in the root of the project. Passing the optional parameter would look like this:

```bash
gulp build --buildConfigFile './example.env.build.config.js'
```

## Production Builds

For production builds, the build.config.js can be updated to appropriate values to utilize CDNs over local resources.

- **third-party dependencies** use their respective CDN as specified by the build's configuration file
- **application specific assets (*css, javascript, images*)** utilize a CDN as specified by the build's configuration file
