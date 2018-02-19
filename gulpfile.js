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

gulp.task('scripts', function() {
  gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/slick-carousel/slick/slick.min.js'])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('images', function() {
  gulp.src('src/assets/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
  ]))
  .pipe(gulp.dest('dist/assets/images'))
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
    ['sass','useref','images'],
    callback
  )
})

gulp.task('watch', ['browserSync','sass'], function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch', 'scripts'],
    callback
  )
});
