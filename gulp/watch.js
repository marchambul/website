var gulp = require('gulp');
var paths = gulp.paths
var $ = require('gulp-load-plugins')()
var mainBowerFiles = require('main-bower-files');


/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/


gulp.task('watch', ['jade','inject', 'localfonts', 'assets', 'images'], function() {
  gulp.watch(paths.es6, ['babel-reload']);
  gulp.watch(paths.sass, ['sass-reload']);
  gulp.watch(paths.jade, ['jade-reload']);
});


gulp.task('localfonts', function() {
  return gulp.src(mainBowerFiles())
  .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
  .pipe($.flatten())
  .pipe(gulp.dest(paths.tmp  + '/fonts/'));
});

gulp.task('assets', function() {
  return gulp.src("src/**/*.json")
  .pipe(gulp.dest(paths.tmp));
});

gulp.task('images', function() {
  return gulp.src("src/assets/img/**/*.*")
  .pipe(gulp.dest(paths.tmp + '/img/'));
});
