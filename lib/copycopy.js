#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const meow = require('meow')

const cli = meow(`
    Usage
      $ copycopy <input glob pattern> <output directory>

    Example
      $ copycopy 'assets/src/css/**/*' assets/dist/css
`)

let inputPattern, outputDir
if (cli.input[0]) {
  inputPattern = cli.input[0]
}
if (cli.input[1]) {
  outputDir = cli.input[1]
}

if (inputPattern && outputDir) {
  glob(inputPattern, (err, files) => {
    if (err) return console.error('copycopy error: ', err)

    if (files.length > 0) {
      try {
        files.forEach((file) => {
          try {
            fs.copySync(file, path.join(outputDir, path.basename(file)))
          } catch (err) {
            console.error(`copycopy error: ${err.message}`)
          }
        })
        console.log(`copycopy'd files from ${inputPattern} to ${outputDir}.`)
      } catch (err) {
        console.error(`copycopy error: ${err.message}`)
      }
    } else {
      console.log(`copycopy couldn't find any files in your input pattern.`)
    }
  })
} else {
  console.log('copycopy needs an input pattern and output pattern!')
}
