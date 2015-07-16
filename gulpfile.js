var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//Get bootstrap js
gulp.task('bootstrap-js', function () {
    gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('app/lib/bootstrap/'));
});

//Less
gulp.task('less', function () {
    gulp.src('app/less/style.less')
        .pipe(less())
        .on('error', function(error) {
            console.log(error.message);
        })
        .pipe(gulp.dest('app/'));
});

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

    //svg
    gulp.watch('app/svg/**/*.svg', ['iconfont']);

    //less
    gulp.watch(['app/less/**/*.less', 'bower_components/bootstrap/less/**/*.less'], ['less']);

    //html
    gulp.watch('app/**/*.html')
        .on('change', livereload.changed);

    //css
    gulp.watch('app/style.css')
        .on('change', livereload.changed);

    //js
    gulp.watch('app/js/app.js')
        .on('change', livereload.changed);
});

//Build
gulp.task('build', ['bootstrap-js', 'less', 'iconfont']);

//Default
gulp.task('default', ['watch']);
