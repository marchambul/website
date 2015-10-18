var gulp = require('gulp');
var paths = gulp.paths;
 var del = require('del');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync').create('server');

/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('serve', ['watch'], function(done) {
    return bs.init({
       server: {
           baseDir: ".tmp/",
           routes: {"/bower_components": "bower_components"}
       }
   });
});

gulp.task('cleanTmp',function(done) {
  return del([paths.tmp + '/**/*'], done);
});

gulp.task('cleanServe',function(done) {
  return $.runSequence('cleanTmp', 'serve');
});
