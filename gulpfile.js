const gulp = require('gulp');
const inliner = require('gulp-mc-inliner');
const nunjucksRender = require('gulp-nunjucks-render');


const env = require('./mailchimp.json');

gulp.task('build', () => {
  return gulp.src('src/emails/**/*.+(css|html|nunjucks)')
             .pipe(nunjucksRender({
                 path: ['src/components'],
               }))
             .pipe(inliner(env.KEY))
             .pipe(gulp.dest('dist/templates'));
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.+(css|html|nunjucks)', ['build']);
})

gulp.task('default', ['build', 'watch']);
