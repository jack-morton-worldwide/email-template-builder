const gulp = require('gulp');
const babel = require('gulp-babel');
const inliner = require('gulp-mc-inliner');
const nunjucksRender = require('gulp-nunjucks-render');

const env = require('./mailchimp.json');

gulp.task('build', () => {
  gulp.src('src/emails/**/*.+(css|html|nunjucks)')
      .pipe(nunjucksRender({
          path: ['src/components'],
        }))
      .pipe(inliner(env.KEY))
      .pipe(gulp.dest('dist/templates'));

  gulp.src('src/client/*.js')
       .pipe(babel({
         presets: ['env'],
       }))
       .pipe(gulp.dest('public'));
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.+(css|html|nunjucks)', ['build']);
})

gulp.task('default', ['build', 'watch']);
