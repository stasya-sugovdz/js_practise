var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    bowerSync = require('browser-sync');

var stylus = require('gulp-stylus'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin');

var concatJs = require('gulp-concat'),
    jsmin = require('gulp-uglify');

var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var prettify = require('gulp-html-prettify'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-minify-html');

// Serve application
gulp.task('serve', function() {
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
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./app/img/'));
});

// concat all .js files into index.js
gulp.task('js', function () {
  return gulp.src('./app/js/*.js')
    .pipe(concatJs('index.js'))
    .pipe(gulp.dest('./app/js/'));
});

//compress, add prefixers and concat all *.styl files to app/css/index.css
//TODO What is 'linenos' doing?
gulp.task('styl', function() {
  return gulp.src('./app/stylus/**/*.styl')
    .pipe(stylus({
      linenos: false,
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
    .pipe(concatCss('index.css'))
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
    .pipe(gulp.dest('./app/html/'))
    .pipe(browserSync.reload({stream: true}));
});

//compress all *.css files(index.css) and rename to index.css.min
// gulp.task('minCss', function () {
//   return gulp.src('./app/css/*.css')
//     .pipe(cssmin())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('./build/css/'));
// });
//
// gulp.task('minJs', function () {
//   return gulp.src('./app/js/index.js')
//     .pipe(jsmin())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('./build/js/'));
// });
//
// gulp.task('minHtml', function () {  //should we concat /*.html?
//   return gulp.src('./app/html/*.html')
//     .pipe(htmlmin())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('./build/html/'));
// });


gulp.task('watch', ['serve', 'styl', 'pug'], function() {
  gulp.watch('./app/stylus/*.styl', ['styl']);
  gulp.watch('./app/pug/*.pug', ['pug']);
  gulp.watch('app/js/*.js', bowerSync.reload);
});

// //TODO gulp.task 'build', which will minimize index.css, index.js, index.html and get them to the build directory
// gulp.task('build', ['minHtml', 'minCss', 'minJs'], function () {
//   return gulp.src(['./app/html/*.html', './app/css/*.css', './app/js/*.js'])
//     .pipe(minHtml())
//     .pipe(minCss())
//     .pipe(minJs());
// });
