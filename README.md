# generator-spa-stack [![Build Status](https://secure.travis-ci.org/andrew-codes/generator-spa-stack.png?branch=master)](https://travis-ci.org/andrew-codes/generator-spa-stack)

> [Yeoman](http://yeoman.io) generator for creating a single-page application project utilizing best practices for integrating react, flux, and other front-end frameworks.

## Technology Stack

- [bower](http://bower.io)

**Unit Testing**
- [mocha](https://github.com/visionmedia/mocha)
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/cjohansen/Sinon.JS)
- [karma](https://github.com/karma-runner/karma)

**End-to-End Testing**
- [nightwatchjs](https://github.com/beatfactor/nightwatch)

**Build Automation**
- [webpack](https://github.com/webpack/webpack)
- [gulp](https://github.com/gulpjs/gulp)
- [CSS auto-prefixer](https://github.com/ai/autoprefixer)

**UI**
- [flux](http://facebook.github.io/react/docs/flux-overview.html)
- [react](https://github.com/facebook/react)
- [stylus](https://github.com/LearnBoost/stylus)
- [font awesome](https://github.com/FortAwesome/Font-Awesome)
- [normalize](https://github.com/necolas/normalize.css)
- [semantic grid system](https://github.com/twigkit/semantic.gs)

**Routing**
- [crossroads](https://github.com/millermedeiros/crossroads.js)
- [history.js](https://github.com/browserstate/history.js)

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
|            +-- {{unit being tested}}-Spec.js
|   |-- e2e
+-- .bowerrc
+-- .jshintrc
+-- bower.json
+-- gulpfile.js
+-- package.json
+-- webpack.config.js
```

### Built Development Structure

```
.
|-- public
|    |-- images
|    |-- js
|        +-- index.js
|    |-- styles
|        +-- index.css
|    +-- index.html
```

### Built Production Structure

```
|-- public
|    +-- index.html
```

#### Notes on Production Deployments
The following are the differences between building the site for a development build and for a production build:

- **third-party dependencies** use their respective CDN as specified by the build's configuration file
- **application specific assets (*css, javascript, images*)** utilize a CDN as specified by the build's configuration file
- **application specific assets** will be combined/minified (css, javascript) and optimized (images)

## Usage

**Note for Developers**: when developing, all of the bower dependencies load locally; as opposed to loading from their respective CDN.

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
gulp build-dev
```

To create a production build, use the following command

```bash
gulp build-production
```
