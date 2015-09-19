var gulp = require('gulp');
var paths = gulp.paths
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')()
var mainBowerFiles = require('main-bower-files');


/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['jade','inject', 'localfonts'], function() {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.tmp + '/**/*', ['bs-reload']);
});


gulp.task('localfonts', function() {
  return gulp.src(mainBowerFiles())
  .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
  .pipe($.flatten())
  .pipe(gulp.dest(paths.tmp  + '/fonts/'));
});
