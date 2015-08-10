var gulp = require('gulp')
var paths = gulp.paths
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')()

/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/

gulp.task('partials', ['inject'], function(done) {
  return gulp.src(paths.tmp + '/**/*.html')
    .pipe($.minifyHtml({empty: true, spare: true, quotes: true}))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {root: '', module: 'cashregister'}))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['partials'], function(done) {
  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {read: false})
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  }
  var assets = $.useref.assets();
  var htmlFilter = $.filter(paths.tmp + 'index.html');
  var jsFilter = $.filter(paths.tmp + '**/*.js');
  var cssFilter = $.filter(paths.tmp + '**/*.css');

  return gulp.src(paths.tmp + '/index.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    // Get the stream with the concatenated asset files (gulp-useref) and automatically change the revision number (gulp-rev) :   unicorn.css → unicorn-098f6bcd.css.
    .pipe(assets)
    .pipe($.rev())
    // js specific processing
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    // css specific processing
    .pipe(cssFilter)
    .pipe($.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    // concatenate all files (2 scripts imported -> 1 script imported) ans change revision (gulp-rev-replace)
    .pipe($.useref())
    .pipe($.revReplace())
    // html specific processing
    .pipe(htmlFilter)
    .pipe($.minifyHtml())
    .pipe(htmlFilter.restore())
    // finish : we copy the final html file
    .pipe(gulp.dest(paths.dist + '/'));
});


gulp.task('fonts', function(done){
  gulp.src(mainBowerFiles())
  .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
  .pipe($.flatten())
  .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('rebuild', ['html', 'fonts'])

gulp.task('cleanDist',function(done) {
  return del([paths.dist + '/**/*'], done);
});

gulp.task('build',function(done) {
  return $.runSequence('cleanDist', 'rebuild');
});
