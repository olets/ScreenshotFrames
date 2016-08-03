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
    cssbeautify = require('gulp-cssbeautify'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence');

// process frame stylesheets
//
// builds a list of a directories subdirectories
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}
// get the names of frame directories
var folders = getFolders('./src');
// get the svgs and images into the frames' stylesheets
gulp.task('screenshot-frames:compile:frames', function(file) {
    // start fresh
    del('./temp/frames/*');
    // for every frame directory
    return folders.map(function(folder) {
        // get the child less file (will match multiple, but there should always be only one)
        return gulp.src('./src/' + folder + '/*.less')
            // base64 encode any background images
            .pipe(base64({
                extensions: ['jpg', 'png']
            }))
            // inject background svg (can match multiple, but there should only ever be one)
            .pipe(inject(gulp.src('./src/' + folder + '/*.svg'), {
                starttag: '/* inject:svg */',
                removeTags: true,
                transform: function(filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
            // save
            .pipe(gulp.dest('./temp/frames'))
    });
});

// make the custom stylesheet
// ideally this would first run the frames' compilation, but that currently cuts off the stream
gulp.task('screenshot-frames:consolidate:custom', /* ['screenshot-frames:compile:frames'],*/ function() {
    // merge the banner, mixins, and custom stylesheet, and save
    return gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-custom.less'])
        .pipe(concat('screenshot-frames-custom.less'))
        .pipe(gulp.dest('./temp'))
});

// make the basic and full stylesheets
// ideally this would first run the frames' compilation, but that currently cuts off the stream
gulp.task('screenshot-frames:consolidate', /* ['screenshot-frames:compile:frames'],*/ function() {
    // merge the banner, mixins, and basic stylesheet, and save
    gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-basics.less'])
        .pipe(concat('screenshot-frames-basics.less'))
        .pipe(gulp.dest('./temp'));
    // merge the banner, mixins, basic stylesheet, and additional stylesheet, and save
    return gulp.src(['./src/banner.css', './src/screenshot-frames-mixins.less', './src/screenshot-frames-basics.less', './src/screenshot-frames-additional.less'])
        .pipe(concat('screenshot-frames.less'))
        .pipe(gulp.dest('./temp'))
});

// make the final minified stylesheets
gulp.task('screenshot-frames:compile', ['screenshot-frames:clean:compiled'], function() {
    // for each of the main LESS stylesheets
    return gulp.src(['./temp/*.less'])
        // report any CSS/LESS errors
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        // compile LESS
        .pipe(less())
        // minify to format the embedded svg's, and keeping the banner
        .pipe(cleanCss({
            keepSpecialComments: 1
        }))
        // reexpand
        .pipe(cssbeautify())
        // save the expanded copy
        .pipe(rename({ extname: ".css" }))
        .pipe(gulp.dest("."))
});

// make the minified stylesheets
gulp.task('screenshot-frames:minify', function() {
    // for each of the compiled stylesheets
    return gulp.src(['./*.css'])
        // minify, keeping the banner
        .pipe(cleanCss({
            keepSpecialComments: 1
        }))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest("."))
});

// this should really be screenshot-frames:clean:temp, screenshot-frames:clean:compiled, and screenshot-frames:clean,
// but screenshot-frames:clean looks nicer than screenshot-frames:clean:temp in the console log when you run `gulp build`
gulp.task('screenshot-frames:clean', function() {
    del('./temp')
});
// dev tasks
gulp.task('screenshot-frames:clean:compiled', function() {
    del(['./*.css'])
})
gulp.task('screenshot-frames:clean:all', ['clean:compiled', 'clean']);


// main tasks
//
gulp.task('config', ['screenshot-frames:compile:frames']);
// not actually a configuration task - it's the first half of the compilation task, which currently kills the stream.
// calling it "config" is a white lie designed to 1) be memorable, 2) sound necessary (which it is)

gulp.task('build:custom', function() {
    runSequence('screenshot-frames:consolidate:custom', 'screenshot-frames:compile', 'screenshot-frames:minify', 'screenshot-frames:clean')
});

gulp.task('build', function() {
    runSequence('screenshot-frames:consolidate', 'screenshot-frames:compile', 'screenshot-frames:minify', 'screenshot-frames:clean')
});
