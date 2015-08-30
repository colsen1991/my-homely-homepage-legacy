"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');

gulp.task('browserify', function () {
    var bundler = browserify({
        entries: ['./assets/js/app.js'],
        transform: [reactify],
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher = watchify(bundler);

    return watcher.on('update', function () {
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
    gulp.watch('./assets/**/*.css', function () {
        return gulp.src('./assets/**/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('build/'));
    });

    gulp.src('./assets/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
});

gulp.task('dev', ['browserify', 'css']);
