var gulp = require('gulp');
var del = require('del');

var zip = require('gulp-zip');
var exec = require('child_process').exec;

var appName = require('package.json').name;
var appVersion = require('package.json').version;

var installpkg = appName + '-' + appVersion + '-install.zip';
var dist = './out/dist';
var frontend = './frontend';
var frontendDist = './frontend/build';

function clean() {
    return del([
        './out/**/*'
    ]);
};

/**
 * Minificacion de archivos js y mover a temporales
 */
function compile(cb) {
    return gulp.src([
        'app/**',
        'i18n/**',
        'package.json',
        'execute.js',
        'loadapp.js',
        'baseconfig.json'
    ], { base: '.' })
        // Minifies only if it's a JavaScript file
        //.pipe(gulpIf('app/**/*.js', ug<lify()))
        .pipe(gulp.dest(dist))
        .on('end', cb);
};


/**
 * Instalación de dependencias en la carpeta de distribucion
 */
function compileview(cb) {
    exec('node node_modules/react-scripts/bin/react-scripts.js build', { cwd: frontend }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        cb(err);
    });
};

/**
 * Instalación de dependencias en la carpeta de distribucion
 */
function distribute(cb) {
    exec('npm install', { cwd: dist }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        cb(err);
    });
};


/**
 *Mover la vista
 */
function moveView() {
    return gulp.src([
        frontendDist + '/**/*'
    ])
        .pipe(gulp.dest(__dirname + '/out/dist/app/statics'));
};

/**
 * Instalación de dependencias en la carpeta de distribucion
 */
function package() {
    return gulp.src([
        "./" + dist + '/**/**',
        "./" + dist + '/**/*',
        "./" + dist + '/.**/*',
        "./" + dist + '/**/.**/*',
        "./" + dist + '/**/.**/**',
        "./" + dist + '/**/.*/*',
        "./" + dist + '/**/.*/**',
        //"../" +frontendDist + '/**/**'
    ], { base: dist })
        .pipe(zip(installpkg))
        .pipe(gulp.dest("./out"));
};



exports.generate = gulp.series(clean, compile, compileview, distribute, moveView, package);