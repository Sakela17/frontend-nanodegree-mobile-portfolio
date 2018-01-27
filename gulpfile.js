'use strict';

// Plugins
var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-clean-css'),
    image = require('gulp-image');

// Minify .html files
gulp.task('min-html', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Minify .js files
gulp.task('min-js', function (cb) {
    pump([
            gulp.src('src/**/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

// Minify .css files
gulp.task('min-css', function(){
    return gulp.src('src/**/*.css')
        //.pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

// Run all the above tasks at once
gulp.task('default', ['min-html', 'min-js', 'min-css']);

// Optimize Images
gulp.task('min-img', function () {
    gulp.src('src/**/*.{gif,jpg,png}')
        .pipe(image())
        .pipe(gulp.dest('dist'));
});