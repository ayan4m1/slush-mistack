'use strict'

os = require 'os'
path = require 'path'

assert = require('yeoman-generator').assert
yo = require('yeoman-generator').test

jsonfile = require 'jsonfile'

describe 'the app generator', ->
  packageInfo =
    name: 'Test Package'
    version: '0.1.0'
    desc: 'This is a test package'
    author: 'Ham Salad <ham@salad.net>'
    license: 'BSD'

  beforeAll (done) ->
    yo.run(path.join(__dirname, '../generators/app'))
      .withPrompts packageInfo
    .on 'end', done

  describe 'is executed, then it should', ->
    it 'create files', ->
      assert.file [
        'bower.json'
        'package.json'
        '.editorconfig'
        '.jshintrc'
      ]

    it 'interpolate package metadata', ->
      info = jsonfile.readFileSync('package.json')
      # todo: probably a cleaner way
      expect(info.name).toBe(packageInfo.name)
      expect(info.version).toBe(packageInfo.version)
      expect(info.repo).toBeUndefined()
      expect(info.description).toBe(packageInfo.desc)
      expect(info.author).toBe(packageInfo.author)
      expect(info.license).toBe(packageInfo.license)
