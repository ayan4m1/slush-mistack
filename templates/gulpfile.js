/**
 * <%= appName %>
 **/

'use strict';

const config = require('konfig')(),
  fs = require('fs'),
  del = require('del'),
  gulp = require('gulp'),
  karma = require('karma'),
  util = require('gulp-util'),
  gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
  jslint = require('gulp-jslint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  csslint = require('gulp-csslint'),
  istanbul = require('gulp-istanbul');

const KarmaServer = karma.Server;

var paths = {
  build: 'build'
};

var defaultHandlers = {
  js: (src) => src.pipe(gulpif(config.build.minify, uglify())),
  html: (src) => src,
  scss: (src) => src.pipe(sass()).pipe(csslint()),
  css: (src) => src.pipe(concat('library.css'))
};

gulp.task('default', ['clean', 'build', 'test'], () => {
  console.log('done with clean/build/test');
});

gulp.task('clean', [], (done) => {
  del(paths.build, done);
});

gulp.task('develop', ['clean', 'build'], () => {
  gulp.watch([], 'build');
});

gulp.task('test', ['clean', 'build'], (done) => {
  new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', [], () => {
	var tasks = [];

	if (!fs.existsSync(paths.build)) {
		fs.mkdirSync(paths.build);
	}

	for (const ext of ['js', 'html', 'scss']) {
		const src = paths.src(ext),
			handler = defaultHandlers[ext];

		if (handler == null) {
			continue;
		}

		console.log("running " + ext + " handler");
		tasks.push(
			handler(gulp.src(src)).pipe(
				gulp.dest(paths.build)
			)
		);
	}

	return tasks;
});
