const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const fileinclude  = require('gulp-file-include');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const sync = require('browser-sync').create();

// Styles

const styles = () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'))
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src('source/js/script.js')
  .pipe(terser())
  .pipe(rename('script.min.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(sync.stream());
}

exports.scripts = scripts;

// Image

const optimizeImage = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img'));
}

exports.images = optimizeImage;

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(gulp.dest('build/img'));
}

exports.images = copyImages;

//Webp

const createWebp = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}'])
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('build/img'))
}

exports.createWebp = createWebp;

//Sprite

const sprite = () => {
  return gulp.src('source/img/icon-sprite/*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

//Include

const Include = () => {
  return gulp.src(['source/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@root'
  }))
  .pipe(gulp.dest('build'));
}

exports.Include = Include;

//Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/img/**/*.svg',
    '!source/img/icon-sprite/*.svg',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

exports.copy = copy;

//Clean

const clean = () => {
  return del('build');
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series('styles'));
  gulp.watch('source/js/script.js', gulp.series('scripts'));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

//Build

const build = gulp.series(
  clean,
  copy,
  optimizeImage,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    Include
));

exports.build = build;

//Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    Include,
    server,
    watcher
  ));
