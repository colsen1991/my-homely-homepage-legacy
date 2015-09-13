'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var del = require('del');

var buildRoot = 'build/';

gulp.task('clean', function () {
  del('build/*');
});

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['assets/js/app.jsx'],
    transform: [babelify],
    extensions: ['.jsx', '.js'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher.on('update', function () {
    var updateStart = Date.now();
    console.log('Building js!');

    watcher.bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('build/'));

    console.log('Done js!', (Date.now() - updateStart) + 'ms');
  }).bundle().pipe(source('main.js')).pipe(gulp.dest('build/'));
});

function makeStylusBundle(src, fileName, dest) {
  return gulp.src(src)
    .pipe(stylus({'include css': true}))
    .pipe(concat(fileName))
    .pipe(gulp.dest(dest));
}

gulp.task('css', function () {
  var src = 'assets/css/includes.styl';
  var fileName = 'main.css';

  gulp.watch('assets/css/**/*', function () {
    var updateStart = Date.now();
    console.log('Building css!');

    var bundle = makeStylusBundle(src, fileName, buildRoot);

    console.log('Done css!', (Date.now() - updateStart) + 'ms');

    return bundle;
  });

  makeStylusBundle(src, fileName, buildRoot);
});

function makeImgBundle(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}

gulp.task('img', function () {
  var src = 'assets/img/**/*';
  var imgDest = buildRoot + '/img'

  gulp.watch(src, function () {
    var updateStart = Date.now();
    console.log('Building img!');

    var bundle = makeImgBundle(src, imgDest);

    console.log('Done img !', (Date.now() - updateStart) + 'ms');

    return bundle;
  });

  makeImgBundle(src, imgDest);
});

gulp.task('dev', ['clean', 'browserify', 'css', 'img']);
