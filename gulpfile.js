'use strict';

//Load plugins
var gulp = require('gulp');
//var rename = require("gulp-rename"); need to install
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');

gulp.task('min-css', function(){
    return gulp.src('./css/*.css') // try css/*.css
        //.pipe(concat('styles.css'))
    //.pipe(rename({ suffix: '.min' })) // or .pipe.(rename(style.min.css)) if you have just one file
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function(){
    gulp.watch('./**/*.css',['min-css']);
});
