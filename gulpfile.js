var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));

/*
----------Top Level Functions----------------
gulp.task - Define tasks
gulp.src - Point to files to use
gulp.dest - Points to  folder to output
gulp.watch - watch files and folders for changes
*/



// Copy Css from bootstrap-select & Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/plugin/bootstrap/scss/bootstrap.scss', 'src/plugin/perfect-scrollbar/css/perfect-scrollbar.css' , 'src/plugin/open-sans-fontface/sass/open-sans.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['src/plugin/bootstrap/dist/js/bootstrap.min.js', 'src/plugin/bootstrap/dist/js/bootstrap.bundle.min.js', 'src/plugin/perfect-scrollbar/dist/perfect-scrollbar.min.js', 'src/plugin/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Move the Open Sans Font files into our /src/fonts/open-sans folder
gulp.task('font', function() {
    return gulp.src(['src/plugin/open-sans-fontface/fonts/*' , 'src/plugin/open-sans-fontface/fonts/*/*'])
        .pipe(gulp.dest("src/css/fonts"))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js', 'font', 'serve'));