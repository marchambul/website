var gulp = require('gulp');
var paths = gulp.paths;
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();
var gulpif = require('gulp-if');
var combine = require('stream-combiner');

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
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };
    var assets = $.useref.assets();


    function processJsFilter() {
        return combine(
            $.debug({title: 'jsFilter'}),
            $.ngAnnotate(),
            $.uglify({preserveComments: $.uglifySaveLicense})
        );
    }

    function processCssFilter() {
        return combine(
            $.debug({title: 'cssFilter'}),
            $.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'),
            $.minifyCss()
        );
    }


    return gulp.src(paths.tmp + '/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    // Get the stream with the concatenated asset files (gulp-useref) and automatically change the revision number (gulp-rev) :   unicorn.css → unicorn-098f6bcd.css.
    .pipe(assets)
    .pipe($.rev())
    // js specific processing
    .pipe(gulpif('**/*.js', processJsFilter()))
    // css specific processing
    .pipe(gulpif('**/*.css', processCssFilter()))
    .pipe(assets.restore())
    // concatenate all files (2 scripts imported -> 1 script imported) ans change revision (gulp-rev-replace)
    .pipe($.useref())
    .pipe($.revReplace())
    // html specific processing
    .pipe(gulpif('**/*.html', $.minifyHtml()))
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
    return gulp.src("src/assets/*.*")
    .pipe(gulp.dest(paths.dist));
});

gulp.task('json', function() {
    return gulp.src("src/**/*.json")
    .pipe(gulp.dest(paths.dist));
});

gulp.task('rebuild', ['html', 'assets', 'json','fonts', 'images']);

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
            Bucket: 'www.marchambul.com'
        },
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: 'eu-west-1',
        apiVersion: 'latest'
    });

    // define custom headers
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    var htmlHeaders = {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'Content-Type': 'text/html; charset=utf-8'
    };

    function processHtml() {
        return combine(
            $.debug({title: 'HTMLLL'}),
            $.rename({extname: ""}),
            $.awspublish.gzip(),
            publisher.publish(htmlHeaders)
        );
    }

    function processStandard() {
        return combine(
            $.debug({title: 'STANDARD:'}),
            $.awspublish.gzip(),
            publisher.publish(headers)
        );
    }


    return gulp.src('www/**')
    .pipe($.debug({title: 'aaaaas:'}))
    // gzip, Set Content-Encoding headers and add .gz extension
    .pipe(gulpif(/^(?!(.*index)).+\.html/, processHtml(), processStandard()))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe($.awspublish.reporter());
});
