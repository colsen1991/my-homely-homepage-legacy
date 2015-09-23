'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var del = require('del');
var plumber = require('gulp-plumber');

var buildRoot = './web';

function onError(error) {
  console.error(error);

  this.emit('end');
}

gulp.task('clean', function () {
  del('./web/*');
});

gulp.task('js', function () {
  return browserify({
    entries: ['./assets/js/app.jsx'],
    transform: [babelify],
    extensions: ['.jsx', '.js'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }).bundle()
    .pipe(plumber({handleError: onError.bind(this)}))
    .pipe(source('main.js'))
    .pipe(gulp.dest(buildRoot + '/js'));
});

gulp.task('css', function () {
  return gulp.src('./assets/css/includes.styl')
    .pipe(plumber({handleError: onError.bind(this)}))
    .pipe(stylus({'include css': true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(buildRoot + '/css'))

});

gulp.task('img', function () {
  return gulp.src('./assets/img/*')
    .pipe(plumber({handleError: onError.bind(this)}))
    .pipe(gulp.dest(buildRoot + '/img'));
});

gulp.task('dev', ['js', 'css', 'img']);

gulp.task('dev:watch', ['dev'], function () {
  gulp.watch('assets/**/*', ['js', 'css']);
});
