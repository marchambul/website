var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var marked = require('marked');
var jade = require('jade');
var swig = require('gulp-swig');
var data = require('gulp-data');
var path = require('path');


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});


var injectOptions = {
    addRootSlash: false,
    ignorePath: paths.tmp
}



/************************************************************************************************************
************************************************* Gulp tasks ************************************************
*************************************************************************************************************/
gulp.task('inject', ['sass','babel','jade'], function() {
    return gulp.src(paths.html)
    .pipe($.plumber())
    .pipe($.inject(gulp.src([paths.tmp + '/**/*.css', '!' + paths.tmp + '/css/vendor.mobile.css'], {read: false}),injectOptions))
    .pipe($.fileInclude({prefix: '@@',basepath: paths.tmp}))
    .pipe(data(function(file) {
        return {
            'vm': {
                'city': path.basename(file.path, '.html'),
                'i18n': require('../src/data/city/' + path.basename(file.path, '.html') + '.json')
            }
        };
    }))
    .pipe(swig({defaults:{autoescape: false}}))
    .pipe($.debug({title: 'injectStyles:'}))
    .pipe($.inject(gulp.src([paths.tmp + '/**/*.js']).pipe($.angularFilesort()),injectOptions))
    .pipe(wiredep())
    .pipe(gulp.dest(paths.tmp));
});
