/*
 * grunt-onesky-output
 * https://github.com/claudiocro/grunt-onesky-output
 *
 * Copyright (c) 2014 Claudio Romano
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    /**
     * @returns {Object} returns an object containing a publickey and privatekey
     */
    function getCredentials() {
        if (grunt.file.exists('onesky.json')) {
            return JSON.parse(grunt.file.read('onesky.json'));
        } else {
            var credentials = {
                publickey: process.env.ONESKY_PUBLICKEY || null,
                privatekey: process.env.ONESKY_PRIVATEKEY || null
            };
            if (!credentials.publickey || !credentials.privatekey) {
                grunt.fail.warn("onesky.json file not found and missing env variables ONESKY_PUBLICKEY or ONESKY_PRIVATEKEY");
            } else {
                return credentials;
            }
        }
    }


    grunt.registerMultiTask('oneskyoutput', 'Pull translation from onesky', function () {
        var self = this;
        var credentials = getCredentials();
        var onesky = require('onesky')(credentials.publickey, credentials.privatekey);
        var path = path = (self.data.path === undefined) ? './tmp/lang' : this.data.path;
        var done = this.async();

        onesky.string.output({
            platformId: this.data.platformId,
            locale: this.data.locale
        }, function (err, oneSkyData) {

            var componentKeys = Object.keys(oneSkyData.translation);
            var _locales, _locale, _content, _localeData;
            var localesData = {};

            for (var iComponent = 0; iComponent < componentKeys.length; iComponent++) {
                _locales = Object.keys(oneSkyData.translation[componentKeys[iComponent]]);

                for (var iLocale = 0; iLocale < _locales.length; iLocale++) {
                    _locale = _locales[iLocale];

                    if (!localesData.hasOwnProperty(_locale)) {
                        localesData[_locale] = {
                            content: {},
                            filename: path + '/' + _locale + ".json"
                        };
                    }
                    _localeData = localesData[_locale];

                    _content = oneSkyData.translation[componentKeys[iComponent]][_locale];
                    for (var _key in _content) {
                        if (_content.hasOwnProperty(_key)) {
                            if (_localeData.content.hasOwnProperty(_key)) {
                                console.log('Key overwritten : ' + _key);
                            }
                            _localeData.content[_key] = _content[_key];
                        }
                    }
                }
            }

            for (_locale in localesData) {
                _localeData = localesData[_locale];
                grunt.file.write(_localeData.filename, JSON.stringify(_localeData.content, null, 4));
                grunt.log.writeln('File ' + _localeData.filename + ' written.');
            }



            done();
        });

    });

};
