'use strict'

path = require('path')
assert = require('yeoman-generator').assert
helpers = require('yeoman-generator').test
os = require('os')

describe 'mistack:app', ->
  beforeEach (done) ->
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions(skipInstall: true)
      .withPrompts(someOption: true)
    .on 'end', done

  describe 'is executed', ->
    it 'creates files', ->
      assert.file [
        'bower.json'
        'package.json'
        '.editorconfig'
        '.jshintrc'
      ]