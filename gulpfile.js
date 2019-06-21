const gulp = require("gulp");
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const plugins = require('gulp-load-plugins')();

const filePath = {
    entry: ['src/nodeuii/**'],//, '!src/nodeuii/public/**'
    output: 'dist',
    publicCss: {
        src: './src/nodeuii/public/css/**/*.css',
        dest: 'dist/public/css/'
    },
    config: {
        src: './src/nodeuii/config/index.js',
        dest: 'dist/config/'
    },
    html:{
        src: './src/nodeuii/view/**/*.html',
        dest: 'dist/view/'
    }
}

function bulidall() {
    return gulp.src(filePath.entry)
        .pipe(gulp.dest(filePath.output));
}

function bulidConfig() {
    return gulp.src(filePath.config.src)
        .pipe(rollup({
            output: {
                format: "cjs"
            },
            input: filePath.config.src,
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest(filePath.config.dest));
}

function bulidCss() {
    return gulp.src(filePath.publicCss.src)
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(filePath.publicCss.dest));
}



function bulidHtml() {
    return gulp.src(filePath.html.src) // 要压缩的html文件
        .pipe(plugins.minifyHtml()) //压缩
        .pipe(gulp.dest(filePath.html.dest));
}

let build = gulp.series(bulidall, bulidConfig, bulidCss, bulidHtml);

gulp.task("default", build);