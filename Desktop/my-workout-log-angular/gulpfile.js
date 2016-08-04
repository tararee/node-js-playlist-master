var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var javascriptFiles = [
  './app.js', 
  './auth/*.js', 
  './define/*.js', 
  './services/*.js' 
];

gulp.task('bundle', function() {
  return gulp.src(javascriptFiles)
    .pipe(plumber()) // Restart gulp on error
    .pipe(sourcemaps.init()) // Let sourcemap watch what we are doing in this pipeline
    .pipe(concat('bundle.js')) // Squish all files together into one file
    .pipe(sourcemaps.write('.')) // Emit sourcemap bundle.js.map for easier debugging
    .pipe(gulp.dest("./content")); // Save the bundle.js and bundle.js.map in app/content
});

// Watch for changes to anything under `app`
gulp.task('watch', function() {
  gulp.watch(javascriptFiles, ['bundle']);
});


// Default task when `gulp` runs: bundle, starts web server, then watches for changes
gulp.task('default', ['bundle', 'watch']);