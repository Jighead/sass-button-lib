/* ===============================================================================
** A gulp workflow to use ES6 with export/import and all the goodies of ES6 
** We need browserify to transpile (wrap) our javascript for CommonJS synchronous loading 
** so that browsers will understand it. 
==================================================================================*/
var gulp = require('gulp'),
		// prints the gulp tasks if you want to see them working
		print = require('gulp-print'),
		// allows us to delete files/folders
		del = require('del'), 
		// allows us to run gulp tasks in specific sequence
		runSq = require('run-sequence'), 
		// creates wrappper around our JS so we can us modules and the browser understands it.
		browserify = require("browserify"),
	// we need viny-source-stream to be able to pipe within the browserify task
		source = require('vinyl-source-stream'),
		// gulp-util is a logging tool for debuggin you gulp tasks
		gutil = require('gulp-util'),
		// transpile our scss code to css
		sass = require('gulp-sass'),
		// autoprefix our css for across browsers
		autoprefixer = require('gulp-autoprefixer'), 
		 //concatenate files
		concat = require('gulp-concat'),
		// clean and minify css
		cleanCss = require('gulp-clean-css'),
		// uses css sourcemaps
		sourcemaps = require('gulp-sourcemaps'),
		// minify javascript
		uglify = require('gulp-uglify'), 
		// we need streamify to be able to pipe uglify in browserify task
		streamify = require('gulp-streamify'), 
		// allows us to specifify the order to concatenate our css
		order = require("gulp-order"),
		// browser-sync dev server (hot reloading with watch)
		browserSync = require('browser-sync') 

// delete everyting in the dist folder
gulp.task('cleanOut', () => {
	return del([  'dist/**/*',  ]) 
});



// Convert sass into css
gulp.task('sass', () => {
	return gulp.src('src/scss/*.scss')
		//.pipe(print())
		.pipe(sourcemaps.init()) // use source maps
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer()) // prefix the css
		.pipe(sourcemaps.write('./maps')) // save source maps here
		.pipe(gulp.dest('dist/css')) // save css here
});

// copy all html files to dist folder
gulp.task('copy-html', () => {
	return gulp.src('./src/**/*.html') // glob the folder structure
	//.pipe(print())
	.pipe(gulp.dest('dist')) 
});


// launching browser-sync server with watch tasks
gulp.task('server', function() {
	browserSync.init({
			server: "./dist"
	});

	gulp.watch("src/scss/*.scss", ['sass']).on('change', browserSync.reload );
	gulp.watch("src/**/*.html", ['copy-html'] ).on('change', browserSync.reload);
});

// run these tasks in sequence using run-sequence and launce the dev server
gulp.task('dev', function() {
	runSq('cleanOut', ['copy-html'], ['sass', 'server']);
});

// Use for Production build.
gulp.task('default', function() {
	runSq('cleanOut', ['copy-html'], ['sass']);
});

