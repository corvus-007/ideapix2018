'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var run = require('run-sequence');
var del = require('del');


gulp.task('style', function () {
  return gulp.src('app/scss/style.scss')
    // .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
      }
    }))
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 version'
        ]
      }),
      // mqpacker({
      //   sort: true
      // })
    ]))
    // .pipe(minify())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('plugins-js', function () {
  gulp.src(['app/js/plugins/device.min.js', 'app/js/plugins/imagesloaded.pkgd.min.js', 'app/js/plugins/jquery.fancybox.js', 'app/js/plugins/slick.js', 'app/js/plugins/svg4everybody.js', 'app/js/plugins/ScrollMagic.min.js', 'app/js/plugins/TweenMax.min.js', 'app/js/plugins/animation.gsap.js', 'app/js/plugins/debug.addIndicators.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('copy-script', function () {
  gulp.src(['app/js/*.{js,json}', '!app/js/plugins/**'])
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('fileinclude', function () {
  gulp.src('app/*.html')
    .pipe(fileinclude({
      indent: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src('build/images')
    .pipe(gulp.dest('build/images'));
});


gulp.task('symbols', function () {
  return gulp.src('build/images/svg-symbols/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/images'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
      'app/fonts/**/*.{woff,woff2}',
      'app/images/**',
      //      'app/js/**',
      'app/*.html'
    ], {
      base: 'app',
      allowEmpty: true
    })
    .pipe(gulp.dest('build'));
});

gulp.task('build', function (fn) {
  run(
    'clean',
    'copy',
    'style',
    'plugins-js',
    'copy-script',
    'fileinclude',
    'images',
    'symbols',
    fn);
});

gulp.task('serve', function () {
  browserSync.init({
    server: "./build"
  });

  gulp.watch('app/scss/**/*.scss', function () {
    setTimeout(function () {
      gulp.start('style');
    }, 500);
  });
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('build/images/svg-symbols/*.svg', ['images', 'symbols']);
  gulp.watch('app/js/plugins/*.js', ['plugins-js']);
  gulp.watch(['app/js/*.{js,json}', '!app/js/plugins/**'], ['copy-script']);
  gulp.watch(['app/*.html', 'app/blocks/**/*.html'], ['fileinclude']).on('change', browserSync.reload);
});
