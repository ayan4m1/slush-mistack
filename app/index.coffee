generators = require 'yeoman-generator'

module.exports = generators.Base.extend
  constructor: ->
    generators.Base.apply @, arguments

    @.option 'cache'
    @.option 'database'
    @.option 'cssDialect'
    @.option 'cssFramework'
    @.option 'appFramework'
    @.option 'testFramework'

    console.log 'client generator initialized'