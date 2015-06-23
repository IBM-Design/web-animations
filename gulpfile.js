'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    scssLint = require('gulp-scss-lint'),
    reload = browserSync.reload;

var css = (function() {
    return {
        compile: function(config) {
            gulp.src('app/src/' + config.src + '.scss')
                .pipe(scssLint({
                    'config': 'scss-lint.yml',
                }));

            gulp.src('app/src/' + config.src + '.scss')
                .pipe(sass())
                .pipe(autoprefixer())
                .pipe(rename(config.rename + '.css'))
                .pipe(gulp.dest('app/dist/' + config.dest))
                .pipe(reload({stream: true}));

            return this;
        }
    };
}());

var js = (function() {
    return {
        compile: function(config) {
            gulp.src('app/src/' + config.src + '.js')
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(gulp.dest('app/dist/' + config.dest));

            return this;
        }
    };
}());

gulp.task('sass', function() {
    return css
            .compile({
                src: 'drawer/main-drawer',
                rename: 'drawer',
                dest: 'drawer'
            })
            .compile({
                src: 'drop-down/main-dropdown',
                rename: 'drop-down',
                dest: 'drop-down'
            })
            .compile({
                src: 'pop-up/main-popup',
                rename: 'pop-up',
                dest: 'pop-up'
            })
            .compile({
                src: 'search/main-search',
                rename: 'search',
                dest: 'search'
            })
            .compile({
                src: 'side-nav/main-sidenav',
                rename: 'side-nav',
                dest: 'side-nav'
            })
            .compile({
                src: 'top-nav/main-topnav',
                rename: 'top-nav',
                dest: 'top-nav'
            })
            .compile({
                src: 'lib/styles/main',
                rename: 'main',
                dest: 'lib'
            });

});

gulp.task('js', function() {
    gulp.src([
            'app/src/lib/scripts/utils/utils.js',
            'app/src/lib/scripts/utils/*.js',
            'app/src/lib/scripts/utils/components/components.js',
            'app/src/lib/scripts/utils/components/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/dist/lib'));

    return js
            .compile({
                src: 'drawer/drawer',
                dest: 'drawer'
            })
            .compile({
                src: 'drop-down/drop-down',
                dest: 'drop-down'
            })
            .compile({
                src: 'pop-up/pop-up',
                dest: 'pop-up'
            })
            .compile({
                src: 'search/search',
                dest: 'search'
            })
            .compile({
                src: 'side-nav/side-nav',
                dest: 'side-nav'
            })
            .compile({
                src: 'top-nav/top-nav',
                dest: 'top-nav'
            });
});

gulp.task('html', function() {
    gulp.src('app/src/index.html').pipe(gulp.dest('app/dist'));  
    gulp.src('app/src/drawer/index.html').pipe(gulp.dest('app/dist/drawer'));
    gulp.src('app/src/drop-down/index.html').pipe(gulp.dest('app/dist/drop-down'));
    gulp.src('app/src/pop-up/index.html').pipe(gulp.dest('app/dist/pop-up'));
    gulp.src('app/src/search/index.html').pipe(gulp.dest('app/dist/search'));
    gulp.src('app/src/side-nav/index.html').pipe(gulp.dest('app/dist/side-nav'));
    gulp.src('app/src/top-nav/index.html').pipe(gulp.dest('app/dist/top-nav'));   
});

gulp.task('serve', ['sass','js'], function() {
    browserSync.init({
        server: {
            baseDir: 'app/dist',
            routes: {
                '/assets': './app/assets'
            }
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(['app/src/**/**/**/*.scss'], ['sass']);
    gulp.watch(['app/src/**/**/**/*.js'], ['js']);
    gulp.watch('app/**/**/*.html', ['html', reload]);
});

gulp.task('default', ['serve', 'watch', 'html']);