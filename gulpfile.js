/* to build, run

        gulp config

    and then

        gulp build
        or
        gulp build:custom
*/

// node
const fs = require('fs'),
    path = require('path');
// npm
const del = require('del'),
    gulp = require('gulp'),
    base64 = require('gulp-base64'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
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

gulp.task('screenshot-frames:compile:frames', function(file) {
    del('./compiled/frames/*');
    return folders.map(function(folder) {
        return gulp.src('./src/' + folder + '/*.less')
            .pipe(base64({
                extensions: ['jpg', 'png']
            }))
            .pipe(inject(gulp.src('./src/' + folder + '/*.svg'), {
                starttag: '/* inject:svg */',
                removeTags: true,
                transform: function(filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
            .pipe(gulp.dest('./compiled/frames'))
    });
});

gulp.task('screenshot-frames:compile:custom', /* ['screenshot-frames:compile:frames'],*/ function() {
    return gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-custom.less'])
        .pipe(concat('screenshot-frames-custom.less'))
        .pipe(gulp.dest('./compiled'))
});

gulp.task('screenshot-frames:compile', /* ['screenshot-frames:compile:frames'],*/ function() {
    del('./compiled/screenshot-frames-custom.less');
    gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-basics.less'])
        .pipe(concat('screenshot-frames-basics.less'))
        .pipe(gulp.dest('./compiled'));
    return gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-basics.less', './src/screenshot-frames-additional.less', './src/screenshot-frames-mixins.less'])
        .pipe(concat('screenshot-frames.less'))
        .pipe(gulp.dest('./compiled'))
});

gulp.task('screenshot-frames:minify', function() {
    gulp.src(['./compiled/*.less'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(cleanCss({
            keepSpecialComments: 1
        }))
        .pipe(gulp.dest("."))
});

gulp.task('clean', function() {
    del('./compiled')
});
gulp.task('clean:minified', function() {
    del(['./*.min.css'])
})
gulp.task('clean:all', ['clean:minified', 'clean']);

gulp.task('config', ['screenshot-frames:compile:frames']);
// not actually a configuration task - it's the first half of the compilation task, which currently kills the stream.
// calling it "config" is a white lie designed to 1) be memorable, 2) sound necessary (which it is)

gulp.task('build:custom', function() {
    runSequence('screenshot-frames:compile:custom', 'screenshot-frames:minify')
});

gulp.task('build', function() {
    runSequence('screenshot-frames:compile', 'screenshot-frames:minify')
});
