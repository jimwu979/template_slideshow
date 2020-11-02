const   gulp        = require('gulp'                ),
        fileinclude = require('gulp-file-include'   ),
        less        = require('gulp-less'           ),
        babel       = require('gulp-babel'          ),
        sourcemaps  = require('gulp-sourcemaps'     ),
        uglify      = require('gulp-uglify'         ),
        del         = require('del'                 ),
        browserSync = require('browser-sync'        ).create();


gulp.task('build_HTML', function (done) {
    del(['./output/*.html']);
    gulp.src('input/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'input/include/',
            indent: true // 保留文件的縮進
        }))
        .pipe(gulp.dest('./output/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('build_CSS', function (done) {
    del(['./output/css/*']);
    gulp.src('./input/less/*')
        .pipe(less())
        .pipe(gulp.dest('./output/css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('build_JS', function(done){
    del(['./output/js/*']);
    gulp.src('./input/js/*')
        .pipe(babel({
            minified: true,
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./output/js/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('build_IMG', function(done){
    del(['./output/img/*']);
    gulp.src('input/img/*')
        .pipe(gulp.dest('./output/img/'))
        .pipe(browserSync.stream());
    done();
});

// gulp.task('browser_sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./output/"
//         },
//         port: 3000
//     });
// });


gulp.task('default',function(){
    let portNumber = 3000;
    browserSync.init({
        server: {
            baseDir: "./output/"
        },
        notify: false,
        port: portNumber
    });
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('server is running: '+ portNumber);
    gulp.watch('input/*.html',      gulp.series('build_HTML'));
    gulp.watch('input/include/*',   gulp.series('build_HTML'));
    gulp.watch('input/less/*',      gulp.series('build_CSS'));
    gulp.watch('input/js/*',        gulp.series('build_JS'));
    gulp.watch('input/img/*',       gulp.series('build_IMG'));
});