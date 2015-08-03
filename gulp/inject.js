var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var markdown = require('markdown');

var injectOptions = {
  addRootSlash: false,
  ignorePath: paths.tmp
}

/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('inject', ['injectApi'], function() {
  return gulp.src(paths.html)
    .pipe($.plumber())
    .pipe($.inject(gulp.src([paths.tmp + '/**/*.css', '!' + paths.tmp + '/css/vendor.mobile.css'], {read: false}),injectOptions))
    .pipe($.fileInclude({prefix: '@@',basepath: paths.tmp}))
    .pipe($.debug({title: 'injectStyles:'}))
    .pipe($.inject(gulp.src([paths.tmp + '/**/*.js']).pipe($.angularFilesort()),injectOptions))
    .pipe(wiredep())
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('injectApi', ['sass','babel','jade'], function() {
  return gulp.src('src/api/*.json')
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file',
      filters: {
        markdown: markdown.markdown.toHTML
      }
  }))
    .pipe(gulp.dest(paths.tmp + '/api'));
});
