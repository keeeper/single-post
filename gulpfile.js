'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');

// Copy images
gulp.task('images', function(){
    gulp.src('./source/images/**.*{jpg,png,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

// Local server for livereload
gulp.task('connect', function() {
    connect.server({
        root: './build',
        livereload: true
    });
});

// Copy HTML
gulp.task('html', function(){
    gulp.src('./source/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

// Styles
gulp.task('styles', function () {
    gulp.src('./source/styles/**.*{scss,css}')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({browsers: ['last 10 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/styles'))
        .pipe(connect.reload());
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./source/images/**.*{jpg,png,svg}', ['images']);
    gulp.watch('./source/styles/**.*{scss,css}', ['styles']);
    gulp.watch('./source/js/*.js', ['jscript']);
    gulp.watch('./source/*.html', ['html']);
});

gulp.task('default', ['connect', 'images', 'html', 'styles', 'watch']);