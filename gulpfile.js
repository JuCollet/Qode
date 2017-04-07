const gulp = require('gulp'),
      del = require('del'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      usemin = require('gulp-usemin'),
      less = require('gulp-less'),
      minifycss = require('gulp-minify-css'),
      rev = require('gulp-rev'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      cache = require('gulp-cache'),
      notify = require('gulp-notify'),
      imagemin = require('gulp-imagemin'),
      ngAnnotate = require('gulp-ng-annotate'),
      browserSync = require('browser-sync'),
      watch = require('gulp-watch');

gulp.task('jshint', function(){
  return gulp.src('./public/dev/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('less', function(){
  return gulp.src('./public/dev/styles/less/*.less')
  .pipe(less())
  .pipe(gulp.dest('./public/dev/styles/'))
});

gulp.task('usemin', ['jshint','less'], function(){
  return gulp.src('./public/dev/**/*.html')
  .pipe(usemin({
    css:[minifycss(),rev()],
    js:[babel({presets:['es2015']}),ngAnnotate(),uglify(),rev()]
  }))
  .pipe(gulp.dest('./public/dist/'));
});

gulp.task('imagemin', function(){
  return gulp.src('./public/dev/images/**/*')
  .pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced:true})))
  .pipe(gulp.dest('./public/dist/images'))
});

gulp.task('copyfonts', function(){
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/fonts'));
})

gulp.task('clean', function(){
  return del(['./public/dist']);
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('{./public/dev/scripts/**/*.js,./public/dev/styles/**/*.css,./public/dev/styles/**/*.less,./public/dev/**/*.html}', ['usemin']);
  gulp.watch('./public/dev/images/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function () {
   const files = [
      './public/dev/**/*.html',
      './public/dev/styles/**/*.css',
      './public/dev/images/**/*.png',
      './public/dev/scripts/**/*.js',
      './public/dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./public/dist",
         index: "index.html"
      }
   });

   gulp.watch(['./public/dist/**']).on('change', browserSync.reload);

});


gulp.task('default', ['clean'], function() {
  gulp.start('usemin','imagemin','copyfonts')
});
