'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./assets/js/app.js'],
    transform: [babelify],
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
  gulp.watch('./assets/**/*.css', function () {
    var updateStart = Date.now();
    console.log('Building css!');

    var bundle = gulp.src('./assets/**/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/'));

    console.log('Done!', (Date.now() - updateStart) + 'ms');

    return bundle;
  });

  gulp.src('./assets/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('dev', ['browserify', 'css']);
