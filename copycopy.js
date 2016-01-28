#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var meow = require('meow');

var cli = meow('\n    Usage\n      $ copycopy <input glob pattern> <output directory>\n\n    Example\n      $ copycopy \'assets/src/css/**/*\' assets/dist/css\n');

var inputPattern = undefined,
    outputDir = undefined;
if (cli.input[0]) {
  inputPattern = cli.input[0];
}
if (cli.input[1]) {
  outputDir = cli.input[1];
}

if (inputPattern && outputDir) {
  glob(inputPattern, function (err, files) {
    if (err) return console.error('copycopy error: ', err);

    if (files.length > 0) {
      try {
        files.forEach(function (file) {
          try {
            fs.copySync(file, path.join(outputDir, path.basename(file)));
          } catch (err) {
            console.error('copycopy error: ' + err.message);
          }
        });
        console.log('copycopy\'d files from ' + inputPattern + ' to ' + outputDir + '.');
      } catch (err) {
        console.error('copycopy error: ' + err.message);
      }
    } else {
      console.log('copycopy couldn\'t find any files in your input pattern.');
    }
  });
} else {
  console.log('copycopy needs an input pattern and output pattern!');
}
