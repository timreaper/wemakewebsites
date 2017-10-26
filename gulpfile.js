/**------------------------------------------------------------------------------------------------------------------**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
 * ------------------------------------ Ed's Gulp File for Handlebars Projects! ------------------------------------- *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
 **------------------------------------------------------------------------------------------------------------------**/

/**-------------------------------*
 * Variable Declarations (Custom)
 *--------------------------------*/

/**
 * Source Paths
 ***/
var config = require('./config.json');

/**--------------------------------*
 * Variable Declarations (Requires)
 *---------------------------------*/

/* Auto adds vendor prefixes for CSS */
var autoPrefixer = require('autoprefixer');

/* Refreshes the browser on change of code */
var browserSync = require('browser-sync').create();

/* Concatenates files in the pipe */
var concat = require('gulp-concat');

/* The almighty runner of tasks */
var gulp = require('gulp');

/* Minifies the CSS */
var minifyCSS = require('gulp-clean-css');

/* CSS post processor for Gulp */
var postCSS = require('gulp-postcss');

var reload = browserSync.reload;

/* Compiles SASS/SCSS into CSS */
var sass = require('gulp-sass');

/**-----------------------------*
 * Tasks (Fetching & Compiling)
 *------------------------------*/

/**
 * Browser Sync
 *      Updates the website in the browser
 ***/
gulp.task('browser_sync', function () {
	browserSync.init({
		server: true,
		injectChanges: true,
		files: config.dist.rootpath
	});
});

/**
 * SCSS (App)
 *       Compiles all the SCSS stylesheets in the app directory
 ***/
gulp.task('scss_app', function () {
	return gulp.src(config.src.rootpath + config.src.sass.rootpath + config.src.sass.app.rootpath + config.src.sass.app.file)
		.pipe(concat('app.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(postCSS([
			autoPrefixer({browsers: ['last 3 versions']})
		]))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.dist.rootpath + config.dist.css.rootpath));
});

/**
 * SCSS (Libraries)
 *       Compiles all the SCSS stylesheets in the libraries directory
 ***/
gulp.task('scss_libraries', function () {
	return gulp.src(config.src.rootpath + config.src.sass.rootpath + config.src.sass.libraries.rootpath + config.src.sass.libraries.file)
		.pipe(concat('libraries.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(postCSS([
			autoPrefixer({browsers: ['last 3 versions']})
		]))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.dist.rootpath + config.dist.css.rootpath));
});

/**----------------------------*
 * Tasks (Watchers)
 *-----------------------------*/

gulp.task('watch', ['browser_sync'], function () {
	gulp.watch(config.src.rootpath + config.src.sass.rootpath + config.src.sass.app.rootpath + '/**/*.scss', ['scss_app']).on("change", reload);
	gulp.watch(config.src.rootpath + config.src.sass.rootpath + config.src.sass.libraries.rootpath + '/**/*.scss', ['scss_libraries']).on("change", reload);
});

/**----------------------------*
 * Tasks (Running & Executing)
 *-----------------------------*/

/**
 * SCSS (SCSS group task)
 *
 ***/
gulp.task('scss', ['scss_app', 'scss_libraries'], function () {
	console.log('Gulp (SCSS) complete.');
});

/**
 * Default (THE MOST IMPORTANT TASK OF ALL)
 *
 ***/
gulp.task('default', ['scss'], function () {
	console.log('Gulp (Default) complete.');
});

