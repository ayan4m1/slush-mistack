gulp = require 'gulp'
jasmine = require 'gulp-jasmine'
reporters = require 'jasmine-reporters'

gulp.task('test', ->
  gulp.src('test/**.coffee')
  .pipe(jasmine {
    reporter: new reporters.TerminalReporter()
  })
)
