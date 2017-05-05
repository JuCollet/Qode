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


// Build Desktop app

gulp.task('desktop', ['clean-desktop'], function() {
  gulp.start('usemin','imagemin','copyfonts')
});

// Build Mobile app

gulp.task('mobile', ['clean-mobile'], function(){
  gulp.start('usemin-mobile', 'imagemin-mobile', 'copyfonts-mobile')
});

// Build Desktop & Mobile apps

gulp.task('default', ['clean'], function() {
  gulp.start('usemin','imagemin','copyfonts', 'mobile')
});

// Delete old builds

gulp.task('clean', function(){
  return del(['./public/dist']);
});

gulp.task('clean-desktop', function(){
  return del(['./public/dist/desktop']);
});

gulp.task('clean-mobile', function(){
  return del(['./public/dist/mobile']);
});


// Desktop Gulp configuration


gulp.task('jshint', function(){
  return gulp.src('./public/clean/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('less', function(){
  return gulp.src('./public/clean/styles/less/*.less')
  .pipe(less())
  .pipe(gulp.dest('./public/clean/styles/'))
});

gulp.task('usemin', ['jshint','less'], function(){
  return gulp.src('./public/clean/**/*.html')
  .pipe(usemin({
    css:[minifycss(),rev()],
    js:[babel({presets:['es2015']}),ngAnnotate(),rev()], // to add for prod : uglify()
    libjs:[rev()]
  }))
  .pipe(gulp.dest('./public/dist/desktop'));
});

gulp.task('imagemin', function(){
  return gulp.src('./public/clean/images/**/*')
  .pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced:true})))
  .pipe(gulp.dest('./public/dist/desktop/images'))
});

gulp.task('copyfonts', function(){
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/desktop/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/desktop/fonts'));
})


// Mobile Gulp configuration


gulp.task('jshint-mobile', function(){
  return gulp.src('./public/pwa/www/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('usemin-mobile', ['jshint-mobile'], function(){
  return gulp.src('./public/pwa/www/**/*.html')
  .pipe(usemin({
    css:[minifycss(),rev()],
    js:[babel({presets:['es2015']}),ngAnnotate(),uglify(),rev()],
    libjs:[rev()]
  }))
  .pipe(gulp.dest('./public/dist/mobile'));
});

gulp.task('imagemin-mobile', function(){
  return gulp.src('./public/pwa/www/img/**/*')
  .pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced:true})))
  .pipe(gulp.dest('./public/dist/mobile/img'))
});

gulp.task('copyfonts-mobile', function(){
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/mobile/styles/fonts'));
  gulp.src('./public/pwa/www/lib/ionic/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./public/dist/mobile/styles/fonts'));
})




/////// NOT USED ANYMORE /////

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