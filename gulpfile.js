var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat');

// Iconfont (ubuntu/mac)
// ====================================================================
gulp.task('iconfont', function(){
    gulp.src(['assets/svg/*.svg'])
        .pipe(iconfontCss({
            fontName: 'iconfont',
            targetPath: '../less/iconfont.less',
            fontPath: '../iconfont/'
        }))
        .pipe(iconfont({
            fontName: 'iconfont',
            normalize: true
        }))
        .pipe(gulp.dest('assets/iconfont/'));
});

// LESS
// ====================================================================
gulp.task('less', function () {
    gulp.src(['assets/lib/**/*.css', 'assets/less/style.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', function(error) {
            console.log(error.message);
        })
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css/'));
});

// Dist CSS
// ====================================================================
gulp.task('dist-css', ['less'], function () {
    gulp.src(['assets/lib/**/*.css', 'assets/css/style.css'])
        .pipe(concat('style.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('dist/assets/css/'));
});

// JS
// ====================================================================
gulp.task('js', function() {
    gulp.src('app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js/'));
});

// Libs JS
// ====================================================================
gulp.task('libs-js', function() {
    var defPath = 'assets/lib/';
    var libs = [
        'jquery/jquery.js',
        'angular/angular.js',
        'lodash/lodash.js',
        '**/*.js'
    ];

    for (var i = 0; i < libs.length; i++) {
        libs[i] = defPath + libs[i];
    }

    gulp.src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('libs.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js/'));
});

// Dist JS
// ====================================================================
gulp.task('dist-js', ['js', 'libs-js'], function() {
    gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'));
});

// Clean dist direcotry
// ====================================================================
gulp.task('dist-clean', function() {
    return gulp.src('dist/*')
        .pipe(clean());
});

// Dist
// ====================================================================
gulp.task('dist', ['dist-clean'], function() {
    gulp.src('assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img/'));

    gulp.src('assets/icnofont/**/*')
        .pipe(gulp.dest('dist/assets/iconfont/'));

    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/app/'));

    gulp.src('app/data/**/*')
        .pipe(gulp.dest('dist/app/data/'));

    gulp.src('index.html')
        .pipe(gulp.dest('dist/'));

    gulp.start('dist-js', 'dist-css');
});

// Build
// ====================================================================
gulp.task('build', ['less', 'js', 'libs-js']);

// Watch
// ====================================================================
gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('assets/svg/**/*.svg', ['iconfont']);

    gulp.watch(['assets/lib/**/*.css', 'assets/less/**/*.less'], ['less']);

    gulp.watch('app/**/*.js', ['js']);

    gulp.watch('assets/lib/**/*.js', ['libs-js']);

    gulp.watch([
            'app/**/*.html',
            'index.html',
            'assets/css/style.css',
            'assets/js/*.js',
            'assets/img/*'])
        .on('change', livereload.changed);
});

//Default
// ====================================================================
gulp.task('default', ['watch']);
