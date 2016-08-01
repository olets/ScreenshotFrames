/* to build, run

        gulp prepare

    and then

        gulp build
*/

// node
const fs = require('fs'),
    path = require('path');
// npm
const del = require('del'),
    gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence');

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}
var folders = getFolders('./src');
gulp.task('screenshot-frames:prep:svg', function(file) {
    folders.map(function(folder) {
        return gulp.src('./src/' + folder + '/*.less')
            .pipe(inject(gulp.src('./src/' + folder + '/*.svg'), {
                starttag: '/* inject:svg_bg_img */',
                removeTags: true,
                transform: function(filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
            .pipe(gulp.dest('./compiled'))
    });
});

gulp.task('screenshot-frames:build:custom', function() {
    gulp.src(['./compiled/screenshot-frames-custom.less'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(rename("screenshot-frames-custom.min.css"))
        .pipe(cleancss({
            keepSpecialComments: 1
        }))
        .pipe(gulp.dest("."))
});

gulp.task('screenshot-frames:build:basics', function() {
    return gulp.src(['./compiled/screenshot-frames-basics.less'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(rename("screenshot-frames-basics.min.css"))
        .pipe(cleancss({
            keepSpecialComments: 1
        }))
        .pipe(gulp.dest("./"))
});

gulp.task('screenshot-frames:build:full', function() {
    return gulp.src(['./compiled/screenshot-frames.less'])
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
        .pipe(gulp.dest("./"));
});

gulp.task('screenshot-frames:prep', /* ['screenshot-frames:prep:svg'],*/ function() {
    return gulp.src('./src/*.less')
        .pipe(gulp.dest("./compiled"))
});

gulp.task('screenshot-frames:clean', function() {
    del('./compiled')
});

gulp.task('screenshot-frames:custom', function() {
    runSequence('screenshot-frames:prep', 'screenshot-frames:build:custom', 'screenshot-frames:clean')
});

gulp.task('screenshot-frames:prepare', ['screenshot-frames:prep:svg']); // ideally this wouldn't be necessary, because it would be wrapped into screenshot-frames:prep

gulp.task( /* 'screenshot-frames' */ 'screenshot-frames:build', function() {
    runSequence('screenshot-frames:prep', 'screenshot-frames:build:full', 'screenshot-frames:build:basics', 'screenshot-frames:clean')
});
