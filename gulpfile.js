var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    del = require('del');

var stylus = require('gulp-stylus'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssnano');

var concatJs = require('gulp-concat'),
    jsmin = require('gulp-uglify');

var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');

var prettify = require('gulp-html-prettify'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-minify-html');

// Serve application
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

//compress images and return them to app/img directory
gulp.task('image', function () {
  return gulp.src('./app/img/*')
    .pipe(cache(imagemin({ //compress images with caching

      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('./app/img/'));
});

// concat all .js files into index.js
gulp.task('js', function () {
  return gulp.src('./app/js/libs/*.js')
    .pipe(jsmin())
    .pipe(concatJs('index.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/js/'))
    .pipe(browserSync.reload({stream: true}));
});

//compress, add prefixers and concat all *.styl files to app/css/index.css
//TODO What is 'linenos' doing?
gulp.task('styl', function() {
  return gulp.src('./app/stylus/**/*.styl')
    .pipe(stylus({
      linenos: true,
      compress: true
    }))
    .pipe(autoprefixer([
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24',
      'Explorer >= 9',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6'
    ]))
    .pipe(cssmin())
    .pipe(concatCss('index.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.reload({stream: true}));
});

//transform .pug files into .html
gulp.task('pug', function() {
  var YOUR_LOCALS = {};

  return gulp.src('./app/pug/index.pug')
    .pipe(pug({
      locals: YOUR_LOCALS
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 3}))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['styl', 'pug', 'image', 'js', 'browser-sync'], function() {
  gulp.watch('./app/stylus/**/*.styl', ['styl']);
  gulp.watch('./app/pug/*.pug', ['pug']);
  gulp.watch('./app/js/**/*.js', ['js']);
  //gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('dist'); // remove dist directory before 'build'
});

gulp.task('build', ['clean', 'styl', 'js', 'pug'], function() {

  var buildCss = gulp.src('./app/css/index.min.css')
    .pipe(gulp.dest('./dist/css/'));

  var buildJs = gulp.src('./app/js/index.min.js')
    .pipe(gulp.dest('./dist/js/'));

  var buildImages = gulp.src('./app/img/*')
    .pipe(gulp.dest('./dist/img/'));

  var buildHtml = gulp.src('./app/*.html')
    .pipe(htmlmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));

});

