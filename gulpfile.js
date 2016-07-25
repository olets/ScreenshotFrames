const	gulp = require('gulp'),
		cleancss = require('gulp-clean-css'),
		less = require('gulp-less'),
		plumber = require('gulp-plumber'),
		rename = require('gulp-rename');

gulp.task('default', function(){
  gulp.src(['./src/screenshot-frames.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(rename("screenshot-frames.min.css"))
    .pipe(cleancss({
        keepSpecialComments: 1
    }))
    .pipe(gulp.dest("."))
});