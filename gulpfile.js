const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

gulp.task('build', () => {
  return gulp.src('src/emails/**/*.+(html|nunjucks)')
             .pipe(nunjucksRender({
                 path: ['src/components'],
               }))
             .pipe(gulp.dest('dist'));
})
