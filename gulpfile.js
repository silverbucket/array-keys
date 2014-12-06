var gulp       = require('gulp'),
    fs         = require('fs'),
    browserify = require('gulp-browserify'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    pkg        = require('./package.json');

gulp.task('default', function () {

  gulp.src('array-keys.js')
      .pipe(browserify({ standalone: 'ArrayKeys' }))
      .pipe(gulp.dest('browser/'))
      .pipe(uglify())
      .pipe(rename('array-keys.min.js'))
      .pipe(gulp.dest('browser/'));
});
