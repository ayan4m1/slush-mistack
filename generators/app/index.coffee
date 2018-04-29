'use strict'

chalk = require('chalk')
yosay = require('yosay')

module.exports = require('yeoman-generator').generators.Base.extend(
  prompting: ->
    done = @async()
    @log yosay('Get ready to make a huge ' + chalk.red('Mistack') + '!')

    metadata = [
      'name'
      'desc'
      'repo'
      'author'
      'version'
      'license'
    ]
    prompts = metadata.map (name) ->
      type: 'input'
      name: name
      message: "package #{name}"

    @prompt prompts, ((props) ->
      @props = props
      done()
    ).bind @

  writing:
    app: ->
      packageInfo =
        name: @props['name']
        desc: @props['desc'] ? ''
        repo: @props['repo'] ? null
        author: @props['author'] ? 'Unknown'
        version: @props['version'] ? '0.0.1'
        license: @props['license'] ? 'MIT'

      @fs.copyTpl @templatePath('_package.json'), @destinationPath('package.json'), packageInfo

    projectfiles: ->
      @fs.copy @templatePath('editorconfig'), @destinationPath('.editorconfig')
      @fs.copy @templatePath('jshintrc'), @destinationPath('.jshintrc')

  install: ->
    @installDependencies()
)
