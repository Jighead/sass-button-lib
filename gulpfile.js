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
		// babelify transpiles our JS to ES6 (with Browserify we need babelify not babel, See .babelrc file)
		babelify = require("babelify"),
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

// Browserify / Babelify - transpiles our code to ES6 and places it in a wrapper 
// We are also minifying
gulp.task('transpile', function() {
	return browserify({ debug: true })
		.transform(babelify)
		.require("./src/app.js", { entry: true })
		.bundle()
		.on('error',gutil.log) // log errors to console
		.pipe(source('bundle.js')) // save it as bundle.js 
		.pipe(streamify(uglify())) // minifiy it
    .pipe(gulp.dest('./dist')); // save it in this folder
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

// concatenate and minify all our 3rd party vendor css into 1 file.
gulp.task('vendor-css', () => {
	return gulp.src('./src/css/*.css')
	//.pipe(print())
					.pipe(autoprefixer()) // prefix the css
					.pipe(order([
						"css/boostrap3.js",
						"gulp css/animate.css",
						//"./css/**/font-awesome.css"
					]))
					.pipe(concat('vendor.css')) // concatenate into 1 file called vendor.css
					.pipe(cleanCss()) // minify the css
					.pipe(gulp.dest('./dist/css')) // save it here
})

// copy all html files to dist folder
gulp.task('copy-html', () => {
	return gulp.src('./src/**/*.html') // glob the folder structure
	//.pipe(print())
	.pipe(gulp.dest('dist')) 
});

// copy all image files to dist/images folder
gulp.task('copy-images', () => {
	return gulp.src('./src/images/**/*.*') // glob the folder structure
	//.pipe(print())
	.pipe(gulp.dest('./dist/images')) 
})

// launching browser-sync server with watch tasks
gulp.task('server', function() {
	browserSync.init({
			server: "./dist"
	});
	gulp.watch('src/css/*.css', ['vendor-css']).on('change', browserSync.reload );
	gulp.watch("src/scss/*.scss", ['sass']).on('change', browserSync.reload );
	gulp.watch("./src/**/*.js", ['transpile']).on('change', browserSync.reload);
	gulp.watch("src/images/**/*.*", ['copy-images']).on('change', browserSync.reload);
	gulp.watch("src/**/*.html", ['copy-html'] ).on('change', browserSync.reload);
});

// run these tasks in sequence using run-sequence and launce the dev server
gulp.task('dev', function() {
	runSq('cleanOut', ['copy-html', 'copy-images', 'vendor-css'], ['sass', 'transpile','server']);
});

// Use for Production build.
gulp.task('default', function() {
	runSq('cleanOut', ['copy-html', 'copy-images', 'vendor-css'], ['sass', 'transpile']);
});

