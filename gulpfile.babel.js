import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import concat from 'gulp-concat';
import stylus from 'gulp-stylus';
import del from 'del';
import plumber from 'gulp-plumber';

const buildRoot = './web';

function onError(error) {
  console.error(error);

  this.emit('end');
}

gulp.task('clean', () => {
  del('./web/*');
});

gulp.task('js', () => {
  return browserify({
    entries: ['./assets/js/app.jsx'],
    transform: [babelify],
    extensions: ['.jsx', '.js'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }).bundle()
    .on('error', onError)
    .pipe(source('main.js'))
    .pipe(gulp.dest(buildRoot + '/js'));
});

gulp.task('css', () => {
  return gulp.src('./assets/css/includes.styl')
    .pipe(plumber({handleError: onError}))
    .pipe(stylus({'include css': true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(buildRoot + '/css'))

});

gulp.task('img', () => {
  return gulp.src('./assets/img/*')
    .pipe(plumber({handleError: onError}))
    .pipe(gulp.dest(buildRoot + '/img'));
});

gulp.task('dev', ['js', 'css', 'img']);

gulp.task('dev:watch', ['dev'], () => {
  gulp.watch('assets/**/*', ['js', 'css']);
});
