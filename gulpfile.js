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
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version','safari 5','ie 8','ie 9'))
    .pipe(cssnano())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('scripts', function() {
  gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'));
});

gulp.task('images', function() {
  gulp.src('app/assets/images/**/*.+(png|jpg|gif|svg)')
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
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['browserSync','sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['sass','useref','images'],
    callback
  )
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch', 'scripts'],
    callback
  )
});
