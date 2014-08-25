/*
 * grunt-onesky-output
 * https://github.com/claudiocro/grunt-onesky-output
 *
 * Copyright (c) 2014 Claudio Romano
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var Onesky = require('onesky')('', '');


  /**
   * @returns {Object} returns an object containing a publickey and privatekey
   */
  function getCredentials() {
    if (grunt.file.exists('onesky.json')) {
      return JSON.parse(grunt.file.read('onesky.json'));
    } else {
      grunt.fail.warn("onesky.json file not found");
    }
  }

  
  grunt.registerMultiTask('oneskyoutput', 'Pull translation from onesky', function() {
    var self = this;
    var credentials = getCredentials();
    var onesky = require('onesky')(credentials.publickey, credentials.privatekey);
    var path = path = (self.data.path === undefined) ? './tmp/lang' : this.data.path;
    var done = this.async();
    var keys,langKeys,filename,fjson;

    onesky.string.output({
      platformId: this.data.platformId,
      locale: this.data.locale
    }, function(a,data) {
      keys = Object.keys(data.translation);
      for(var i=0; i<keys.length; i++) {
        langKeys = Object.keys(data.translation[keys[i]]);
        for(var y=0; y<langKeys.length; y++) {
          filename = path+'/'+langKeys[y]+".json";
          fjson = JSON.stringify(data.translation[keys[i]][langKeys[y]]);
          fjson = JSON.parse(fjson, function(key,value){
          	if (value && typeof value === 'object') {

      			for (var k in value) {
        			if (/^[a-zA-Z."-_]/.test(k) && Object.hasOwnProperty.call(value, k)) {
        				console.log(k);
          				value[k.replace(/\"/g, '')] = value[k];
          				delete value[k];
        			}
      			}
      		}
      		
      		return value;

          });
          grunt.file.write(filename, JSON.stringify(fjson));
          //grunt.log.writeln(Object.keys(data.translation[keys[i]][langKeys[y]])[0]);
          grunt.log.writeln('File '+filename+' written.');
        }
        
      }
      
      done();
    });

  });

};
