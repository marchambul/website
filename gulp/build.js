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
    .pipe($.angularTemplatecache('templateCacheHtml.js', {root: '', module: 'marchambul'}))
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
  return gulp.src(mainBowerFiles())
  .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
  .pipe($.flatten())
  .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('images', function() {
  return gulp.src("src/assets/img/**/*.*")
  .pipe(gulp.dest(paths.dist + '/img/'));
});

gulp.task('assets', function() {
  return gulp.src("src/**/*.json")
  .pipe(gulp.dest(paths.dist));
});

gulp.task('rebuild', ['html', 'assets', 'fonts', 'images']);

gulp.task('cleanDist',function(done) {
  return del([paths.dist + '/**/*'], done);
});

gulp.task('build',function(done) {
  return $.runSequence('cleanDist', 'rebuild');
});

gulp.task('deploy', function() {
  console.log(process.env.AWS_KEY);
  var publisher = $.awspublish.create({
    params: {
      Bucket: 'marchambulv2'
    },
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'eu-central-1',
    apiVersion: 'latest'
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('www/**')
     // gzip, Set Content-Encoding headers and add .gz extension
    .pipe($.awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe($.awspublish.reporter());
});
