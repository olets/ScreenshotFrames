const gulp = require('gulp'),
    del = require('del'),
    cleancss = require('gulp-clean-css'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

gulp.task('inject-inline-svg', function() {
    gulp.src('./src/**/*.less')
        .pipe(inject(gulp.src(['./src/**/*.svg']), {
            relative: true,
            starttag: '<!-- inject:svg -->',
            transform: function(filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(gulp.dest('./temp'));
})

gulp.task('screenshot-frames:clean', function() {
    del('./temp')
});

gulp.task('screenshot-frames:less', function() {
    gulp.src(['./temp/screenshot-frames.less'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(rename("screenshot-frames.min.css"))
        .pipe(cleancss({
            keepSpecialComments: 1
        }))
        .pipe(gulp.dest("."))
});

gulp.task('screenshot-frames', ['screenshot-frames:less'], 'screenshot-frames:clean');

gulp.task('default', ['inject-inline-svg'], 'screenshot-frames');
