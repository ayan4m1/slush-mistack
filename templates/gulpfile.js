/**
  * Mistack build script
  */

'use strict';

var del = require('del');

var paths = {
	build: () => 'build',
	bower: () => 'lib',
	src: (exts) => {
		if (!exts) { exts = []; }
		var result = [];

		for (var ext of exts) {
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
	coffee: (src) => src.pipe(coffee()).pipe(uglify()),
	html: (src) => src,
	scss: (src) => src.pipe(sass()).pipe(cssmin())
};

gulp.task('default', ['clean', 'build', 'test'], () => {

});

gulp.task('clean', [], () => {
	del(paths.build);
});

gulp.task('build', [], () => {
	fs.mkdirSync(paths.build);
	for (var ext of ['js', 'html', 'scss']) {
		var src = paths.src(ext);
		defaultHandlers[ext](gulp.src(src)).pipe(gulp.dest);
	}
});

gulp.task('develop', ['clean', 'build'], () => {
	gulp.watch([], 'build');
});

gulp.task('test', [], () => {
	// todo: this
});

gulp.task('package', ['clean', 'build'], () => {

});