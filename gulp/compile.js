var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

var sass = function(){
    return gulp.src(paths.sass)
    .pipe($.sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.tmp));
};

var jade = function(){
    return gulp.src(paths.jade)
    .pipe($.jade())
    .pipe(gulp.dest(paths.tmp))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {root: '', module: 'marchambul'}))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
};

var babel = function(){
    return gulp.src(paths.es6)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest(paths.tmp));
};






/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('sass', function() {
    return sass();
});

gulp.task('sass-reload', function() {
    var bs = require('browser-sync').get('server');
    return sass().pipe(bs.stream());
});

gulp.task('jade', function(){
    return jade();
});

gulp.task('jade-reload', function(){
    var bs = require('browser-sync').get('server');
    return jade().pipe(bs.stream());
});

gulp.task('babel', function () {
    return babel();
});

gulp.task('babel-reload', function () {
    var bs = require('browser-sync').get('server');
    return babel().pipe(bs.stream());
});
