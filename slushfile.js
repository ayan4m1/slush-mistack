/*
 * slush-generator-mistack
 * https://github.com/ayan4m1/slush-generator-mistack
 *
 * Copyright (c) 2016-2018, ayan4m1
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path'),
	gulp = require('gulp'),
	inquirer = require('inquirer'),
	rename = require('gulp-rename'),
	_ = require('underscore.string'),
	install = require('gulp-install'),
	conflict = require('gulp-conflict'),
	template = require('gulp-template');

var defaults = (() => {
	var workingDirName = path.basename(process.cwd()),
		homeDir, osUserName, configFile, user;

	if (process.platform === 'win32') {
		homeDir = process.env.USERPROFILE;
		osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
	} else {
		homeDir = process.env.HOME || process.env.HOMEPATH;
		osUserName = homeDir && homeDir.split('/').pop() || 'root';
	}

	configFile = path.join(homeDir, '.gitconfig');
	user = {};

	if (require('fs').existsSync(configFile)) {
		user = require('iniparser').parseSync(configFile).user;
	}

	return {
		appName: workingDirName,
		userName: osUserName || format(user.name || ''),
		authorName: user.name || '',
		authorEmail: user.email || ''
	};
})();

gulp.task('default', (done) => {
	var prompts = [{
		name: 'appName',
		message: 'What is the name of your project?',
		default: defaults.appName
	}, {
		name: 'appDescription',
		message: 'Describe your app in a few sentences.'
	}, {
		name: 'appVersion',
		message: 'What is the version of your project?',
		default: '0.0.1'
	}, {
		name: 'authorName',
		message: 'What is the author name?',
		default: defaults.authorName
	}, {
		name: 'authorEmail',
		message: 'What is the author email?',
		default: defaults.authorEmail
	}, {
		name: 'repository',
		message: 'What is the repository URL?',
		default: ''
	}, {
		name: 'bootswatchTheme',
		message: 'Which Bootswatch theme would you like to use?',
		default: 'readable'
	}, {
			type: 'confirm',
			name: 'moveon',
			message: 'Continue?'
	}];

	inquirer.prompt(prompts, (answers) => {
		if (!answers.moveon) {
			return done();
		}

		// fill in some computed answers
		answers.appNameSlug = _.slugify(answers.appName);
		answers.appNameDashes = _.classify(answers.appName).toLowerCase();
		answers.currentYear = new Date().getFullYear();

		gulp.src(__dirname + '/templates/**')
			.pipe(template(answers, {
				// the default includes ${} as an interpolation token
				// and our app uses these tokens, so skip 'em here
				interpolate: /<%=([\s\S]+?)%>/g
			}))
			.pipe(rename(function (file) {
				if (file.basename[0] === '_') {
					file.basename = '.' + file.basename.slice(1);
				}
			}))
			.pipe(conflict('./'))
			.pipe(gulp.dest('./'))
			.pipe(install())
			.on('end', () => {
				console.log('Congrats, you\'ve made a big MISTACK!');
				done();
			});
	});
});
