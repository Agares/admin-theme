var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

const sassConfig = {
    includePaths: [
        './node_modules/'
    ]
};

gulp.task('default', ['css']);

gulp.task('css', ['copy-font-awesome', 'copy-lato-font'], function() {
    gulp
        .src('src/css/**/*.scss')
        .pipe(sass(sassConfig).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-font-awesome', function() {
    return gulp.src('./node_modules/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-lato-font', function() {
    return gulp.src('./node_modules/lato-font/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('./src/css/**/*.scss', ['css']);
});