# grunt-onesky

> Pull translation from [Onesky](http://developer.oneskyapp.com/api)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-onesky-output --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-onesky-output');
```

## The "onesky" task

### Overview
In your project's Gruntfile, add a section named `oneskoutput` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  oneskyoutput: {
    oneskyoutput: {
      default_options: {
        
      }
    },
  },
});
```

### Default Options

#### default_options.platformId
Type: `String`

Your [Onesky](http://developer.oneskyapp.com/api) plattformId

#### default_options.lang
Type: `String`

[Onesky](http://developer.oneskyapp.com/api) language like 'de_DE' to pull, if empty all languages will be pulled

#### default_options.path
Type: `String`
Default value: `'./tmp/lang'`

A string value that is as the path where to store the language file.

## [Onesky](http://developer.oneskyapp.com/api) Authentication
In order to be able to authenticate you need a file called 'onesky.json' with you onesky privatekey and publickey
Don't forget to add 'onesky.json' to .gitignore in order to not expose your onesky account.

```js
{
  "publickey": "Your Onesky publickey",
  "privatekey": "Your Onesky privatekey"
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
###0.1.0
- First release

###0.1.1
- Adjust single qoutes in key's

###0.1.2
- Remove unecessary console logging's
