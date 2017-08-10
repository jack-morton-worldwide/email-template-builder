const gulp = require('gulp');
const inliner = require('gulp-mc-inliner');
const nunjucksRender = require('gulp-nunjucks-render');

const config = require('./mailchimp.json');

gulp.task('build', () => {
  return gulp.src('src/emails/**/*.+(html|nunjucks)')
             .pipe(nunjucksRender({
                 path: ['src/components'],
               }))
             .pipe(inliner(config.KEY))
             .pipe(gulp.dest('dist'));
})
