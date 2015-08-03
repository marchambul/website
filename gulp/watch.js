var gulp = require('gulp');
var paths = gulp.paths
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')()


/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['jade','inject'], function() {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.tmp + '/**/*', ['bs-reload']);
});
