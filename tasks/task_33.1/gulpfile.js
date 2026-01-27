const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const { deleteAsync } = require('del');
const prettierModule = require('gulp-prettier');
const gulpPrettier = prettierModule.default || prettierModule;

const paths = {
    html: { src: 'src/**/*.html', dest: 'dist/' },
    styles: { src: 'src/scss/**/*.scss', dest: 'dist/css/' },
    scripts: { src: 'src/scripts/**/*.js', dest: 'dist/scripts/' },
};

async function clean() {
    await deleteAsync(['dist']);
}

function html() {
    return src(paths.html.src)
        .pipe(plumber())
        .pipe(gulpPrettier({ parser: 'html' }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(paths.scripts.src)
        .pipe(plumber())
        .pipe(gulpPrettier({ parser: 'babel' }))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function stylesDev() {
    return src(paths.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulpPrettier({ parser: 'css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function stylesMin() {
    return src(paths.styles.src)
        .pipe(plumber())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.dest));
}

function serve() {
    browserSync.init({
        server: { baseDir: 'dist' },
        notify: false,
        open: true,
    });

    watch(paths.html.src, html);
    watch(paths.styles.src, stylesDev);
    watch(paths.scripts.src, scripts);
}

const build = series(clean, parallel(html, scripts, stylesDev), stylesMin);

exports.clean = clean;
exports.build = build;
exports.dev = series(build, serve);
exports.default = build;