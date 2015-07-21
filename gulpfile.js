var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    concat = require('gulp-concat');

//Less
gulp.task('less', function () {
    gulp.src('app/less/style.less')
        .pipe(less())
        .on('error', function(error) {
            console.log(error.message);
        })
        .pipe(gulp.dest('app/'));
});

// Javascript
gulp.task('js', function() {
    gulp.src(['app/js/main.js', 'app/components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/'));
    })

//Iconfont
gulp.task('iconfont', function(){
    gulp.src(['app/svg/*.svg'])
        .pipe(iconfontCss({
            fontName: 'iconfont',
            targetPath: '../less/iconfont.less',
            fontPath: '../iconfont/'
        }))
        .pipe(iconfont({
            fontName: 'iconfont',
            normalize: true
        }))
        .pipe(gulp.dest('app/iconfont/'));
});

//Watch
gulp.task('watch', function () {
    livereload.listen();

    //Build svg
    gulp.watch('app/svg/**/*.svg', ['iconfont']);

    //Build less
    gulp.watch('app/less/**/*.less', ['less']);

    //Build js
    gulp.watch(['app/js/**/*.js', 'app/components/**/*.js'], ['js']);

    //Watch html
    gulp.watch('app/**/*.html')
        .on('change', livereload.changed);

    //Watch css
    gulp.watch('app/style.css')
        .on('change', livereload.changed);

    //Watch js
    gulp.watch('app/app.js')
        .on('change', livereload.changed);
});

//Build
gulp.task('build', ['less', 'iconfont', 'js']);

//Default
gulp.task('default', ['watch']);
