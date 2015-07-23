'use strict'

chalk = require('chalk')
yosay = require('yosay')

module.exports = require('yeoman-generator').generators.Base.extend(
  prompting: ->
    done = @async()
    @log yosay('Welcome to the ' + chalk.red('Mistack') + ' generator!')

    prompts = [
      type: 'confirm'
      name: 'someOption'
      message: 'Would you like to enable this option?'
      default: true
    ]

    @prompt prompts, ((props) ->
      @props = props
      done()
    ).bind @

  writing:
    app: ->
      @fs.copy @templatePath('_package.json'), @destinationPath('package.json')
      @fs.copy @templatePath('_bower.json'), @destinationPath('bower.json')
    projectfiles: ->
      @fs.copy @templatePath('editorconfig'), @destinationPath('.editorconfig')
      @fs.copy @templatePath('jshintrc'), @destinationPath('.jshintrc')

  install: ->
    @installDependencies()
)