var gulp = require('gulp')
var paths = gulp.paths
var $ = require('gulp-load-plugins')()

/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('jade', function(){
  return gulp.src(paths.jade)
    .pipe($.jade())
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('babel', function () {
  return gulp.src(paths.es6)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest(paths.tmp));
});
