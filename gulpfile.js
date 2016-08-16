var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssMin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');


gulp.task('imagemin', function() {
  return gulp.src('./static/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [imageminOptipng({
        optimizationLevel: 3
      }), imageminJpegtran({
        progressive: true
      })]
    }))
    .pipe(gulp.dest('./static/images/'));
});
/**
 * 代码质量、风格检查
 */
gulp.task('lint', function() {
  return gulp.src('./static/js/index.js')
    .pipe(eslint())
    .pipe(eslint.result(function(result) {
      console.log('ESLint result: ' + result.filePath);
      console.log('# Messages: ' + result.messages.length);
      console.log('# Warnings: ' + result.warningCount);
      console.log('# Errors: ' + result.errorCount);
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * js 文件合并、压缩
 */
gulp.task('js', function() {
  gulp.src('./static/js/index.js')
    .pipe(concat('./static/js/index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

/**
 * css 文件合并、压缩
 */
gulp.task('css', function() {
  gulp.src([
      './static/css/index.css'
    ])
    .pipe(cssMin())
    .pipe(concat('./static/css/index.min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', function () {
  gulp.watch([
      './static/js/*', './static/css/*'],
      ['js', 'css']
  );
})
