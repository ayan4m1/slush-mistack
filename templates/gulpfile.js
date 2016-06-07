/**
  * Mistack build script
  */

'use strict';

var gulp = require('gulp'),
		util = require('gulp-util'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		csslint = require('gulp-csslint'),
		ngAnnotate = require('gulp-ng-annotate'),
		jshint = require('gulp-jshint'),
		del = require('del');

var paths = {
	build: () => 'build',
	bower: () => 'lib',
	src: (exts) => {
		if (!exts) { exts = []; }
		var result = [];

		for (const ext of exts) {
			result.push(`src/${ext}`);
		}

		if (exts.length == 0) {
			result.push('src/');
		}

		return result;
	}
};

var defaultHandlers = {
	js: (src) => src.pipe(uglify()),
	html: (src) => src,
	scss: (src) => src.pipe(sass()).pipe(cssmin())
};

gulp.task('default', ['clean', 'build', 'test'], () => {
	console.log('done with clean/build/test');
});

gulp.task('clean', [], (done) => {
	del(paths.build, done);
});

gulp.task('build', [], () => {
	var tasks = [];
	fs.mkdirSync(paths.build);
	for (const ext of ['js', 'html', 'scss']) {
		var src = paths.src(ext);
		tasks.push(defaultHandlers[ext](gulp.src(src)).pipe(gulp.dest(paths.dest)));
	}
	return tasks;
});

gulp.task('develop', ['clean', 'build'], () => {
	gulp.watch([], 'build');
});

gulp.task('test', [], () => {
	// todo: this
});

gulp.task('package', ['clean', 'build'], () => {

});