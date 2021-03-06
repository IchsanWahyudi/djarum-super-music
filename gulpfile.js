var gulp = require('gulp');
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    cssnano = require('gulp-cssnano');
    browserSync = require('browser-sync').create();
    useref = require('gulp-useref');
    uglify = require('gulp-uglify');
    gulpIf = require('gulp-if');
    concat = require('gulp-concat');
    imagemin = require('gulp-imagemin');
    del = require('del');
    runSequence = require('run-sequence');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('sass', function() {
  gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version','safari 5','ie 8','ie 9'))
    .pipe(cssnano())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('cssVendor', function() {
  gulp.src(['node_modules/wowjs/css/libs/animate.css','src/assets/css/responsive.css','src/assets/css/master.css','node_modules/bootstrap/dist/css/bootstrap.min.css','node_modules/slick-carousel/slick/slick.css','node_modules/slick-carousel/slick/slick-theme.css','node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css','node_modules/select2/dist/css/select2.min.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('src/assets/css/'))
})

gulp.task('scripts', function() {
  gulp.src(['node_modules/wowjs/dist/wow.min.js','node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js',])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('watch', ['browserSync','sass'], function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch', 'scripts','cssVendor'],
    callback
  )
});

// for production

gulp.task('images', function() {
  gulp.src('src/assets/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
  ]))
  .pipe(gulp.dest('dist/assets/images'))
})


gulp.task('script', function() {
  gulp.src(['src/assets/js/script.js','node_modules/slick-carousel/slick/slick.min.js','node_modules/select2/dist/js/select2.min.js','node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'));
});

// gulp.task('css', function() {
//   gulp.src(['src/assets/css/responsive.css','src/assets/css/master.css','node_modules/bootstrap/dist/css/bootstrap.min.css','node_modules/slick-carousel/slick/slick.css','node_modules/slick-carousel/slick/slick-theme.css','node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css','node_modules/select2/dist/css/select2.min.css'])
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist/assets/css/'))
// })

gulp.task('fonts', function() {
  return gulp.src(['src/assets/fonts/**/*','node_modules/slick-carousel/slick/fonts/**/*'])
  .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('clean:dist', function() {
  del.sync('dist');
})

gulp.task('useref', function() {
  gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('src/assets/js/*.js', uglify()))
    .pipe(gulpIf('src/assets/css/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['useref','images','css','script','fonts','scripts'],
    callback
  )
})
