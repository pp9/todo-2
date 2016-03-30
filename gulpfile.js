var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src('./client/src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/build/css'))
    .pipe(livereload());
});

gulp.task('watch', ['sass'], () => {
    livereload.listen();
    gulp.watch('./client/src/sass/*.scss', ['sass']);
});
