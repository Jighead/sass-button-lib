# Gulp scaffold with ES6, Browserify and Babel as well as jQuery, Sass baked in.
This gulp work-flow that will allow you to build ES6 projects using ES6 Export/Import modules.
It's a folder structure I like to use. It has examples of how you can create moduler components
and inject them in to the dom. 

Uses the following gulp packages

	
		* gulp-print  -  	prints the gulp tasks if you want to see them working
		* del  -  allows us to delete files/folders
		* gulp-run-sequence - allows us to run gulp tasks in specific sequence
		* gul-browserify   -    creates wrappper around our JS so we can us modules and the browser understands it.
		* gulp-babelify  -  transpiles our JS to ES6 (with Browserify we need babelify not babel, See .babelrc file)
		* gup-vinyl-source-stream  -  we need viny-source-stream to be able to pipe within the browserify task
		* gulp-util'  -  logging tool for debuggin you gulp tasks
		* gulp-sass'  transpile our scss code to css
		* gulp-autoprefixer autoprefix our css for across browsers
		* gulp-concat  -  concatenate files
    * gulp-clean-css  -  clean and minify css
    * gulp-sourcemaps  - create css sourcemaps
		* gulp-uglify  -  minify javascript
		* gulp-streamify  -  we need streamify to be able to pipe uglify in browserify task
		* gulp-order  -  allows us to specifify the order to concatenate our css
		* browser-sync  -  dev server (hot reloading with watch)

## usage

* clone repo or download the zip file
* go to the project's root directory


```
npm install  -- installs dependencies from package.json
```
run the gulp file 
```
gulp dev     -- To stop server, press CTRL+C
```
```
gulp dev     -- build for production (no server)
```

