var gulp = require('gulp'),
    concatCss = require('gulp-concat-css');

gulp.task('concat', function () {
    return gulp.src('./app/css/*.css')
        .pipe(concatCss('index.css'))
        .pipe(gulp.dest('./build/'));
});