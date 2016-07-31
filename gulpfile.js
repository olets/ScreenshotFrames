/* to build, run

        gulp prepare

    and then

        gulp build
*/

// node
const fs = require('fs'),
    path = require('path');
// npm
const gulp = require('gulp'),
    del = require('del'),
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
gulp.task('screenshot-frames:svg', function(file) {
    folders.map(function(folder) {
        return gulp.src('./src/' + folder + '/*.less')
            .pipe(inject(gulp.src('./src/' + folder + '/*.svg'), {
                starttag: '/* inject:svg_bg_img */background-image: url(\'data:image/svg+xml;utf8,',
                endtag: '\');/* endinject */',
                transform: function(filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
            .pipe(gulp.dest('./temp'))
    });
});

gulp.task('screenshot-frames:prep', /* ['screenshot-frames:svg'],*/ function() {
    return gulp.src('./src/*.less')
        .pipe(gulp.dest("./temp"))
});

gulp.task('screenshot-frames:build', ['screenshot-frames:prep'], function() {
    return gulp.src(['./temp/screenshot-frames.less'])
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

gulp.task('screenshot-frames:clean', function() {
    del('./temp')
});

// gulp.task('default', function() {
//     runSequence('screenshot-frames:build', 'screenshot-frames:clean')
// });

gulp.task('prepare', ['screenshot-frames:svg']);
gulp.task('build', function(){
    runSequence('screenshot-frames:build', 'screenshot-frames:clean')
});
