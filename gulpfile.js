const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('minify', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest('dist'))
});