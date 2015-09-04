'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./assets/js/app.jsx'],
    transform: [babelify],
    extensions: ['.jsx, .js'],
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher.on('update', function () {
    var updateStart = Date.now();
    console.log('Building js!');

    watcher.bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build/'));

    console.log('Done!', (Date.now() - updateStart) + 'ms');
  }).bundle().pipe(source('main.js')).pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
  gulp.watch('./assets/css/*.styl', function () {
    var updateStart = Date.now();
    console.log('Building css!');

    var bundle = gulp.src('./assets/css/includes.styl')
      .pipe(stylus({'include css': true}))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/'));

    console.log('Done!', (Date.now() - updateStart) + 'ms');

    return bundle;
  });

  gulp.src('./assets/css/includes.styl')
    .pipe(stylus({'include css': true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('dev', ['browserify', 'css']);
