var gulp       = require('gulp'),
    fs         = require('fs'),
    browserify = require('browserify'),
    transform  = require('vinyl-transform'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    pkg        = require('./package.json');

var filename = 'array-keys.js';
var objName  = 'ArrayKeys';

gulp.task('default', function () {

  var browserified = transform(function (name) {
      var b = browserify(name, { standalone: objName });
      return b.bundle();
    });

  gulp.src(filename)
      .pipe(browserified)
      .pipe(gulp.dest('browser/'))
      .pipe(uglify())
      .pipe(rename('array-keys.min.js'))
      .pipe(gulp.dest('browser/'));
});
