var gulp = require('gulp'); //把模块引进来
var $ = require('gulp-load-plugins')(); //引用所有package.json里面的模块
var open = require("open");

var app={
    buildPath:"build/",
    distPath:"dist/",
    srcPath:"src/"
};

gulp.task('jquery', function() {
    // 将你的默认的任务代码放在这
    gulp.src('bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest(app.buildPath+'lib/jquery'))    //开发环境
        .pipe(gulp.dest(app.distPath+'lib/jquery'));     //生产环境
});
gulp.task('store2', function() {
    // 将你的默认的任务代码放在这
    gulp.src('bower_components/store2/dist/*.js')
        .pipe(gulp.dest(app.buildPath+'lib/store2'))    //开发环境
        .pipe(gulp.dest(app.distPath+'lib/store2'));     //生产环境
});

gulp.task('img',function(){
    gulp.src(app.srcPath+'images/*')//路径
        .pipe(gulp.dest(app.buildPath+'images'))//开发路径
        .pipe($.imagemin())//图片压缩
        .pipe(gulp.dest(app.distPath+'images'))//生产路径
        .pipe($.connect.reload());
});

gulp.task("html",function(){
   gulp.src(app.srcPath+'*.html')
       .pipe(gulp.dest(app.buildPath))
       .pipe(gulp.dest(app.distPath))
       .pipe($.connect.reload());
});

gulp.task('js',function(){
    gulp.src(app.srcPath+'js/*')//路径
        .pipe($.concat("index.js"))
        .pipe(gulp.dest(app.buildPath+'js'))//开发路径
        .pipe($.uglify())//js压缩
        .pipe(gulp.dest(app.distPath+'js'))//生产路径
        .pipe($.connect.reload());
});

gulp.task('css',function(){
    gulp.src(app.srcPath+'css/*')//路径
        .pipe($.concat("index.css"))
        .pipe(gulp.dest(app.buildPath+'css'))//开发路径
        .pipe($.cssmin())//css压缩
        .pipe(gulp.dest(app.distPath+'css'))//生产路径
        .pipe($.connect.reload());
});

gulp.task("clear",function () {
   gulp.src([app.buildPath,app.distPath])
       .pipe($.clean())
});

gulp.task('build',["jquery","img","html","js","css","store2"]);

// gulp.task("serve",['build'],function(){
//     $.connect.server({
//         root:[app.buildPath],
//         livereload: true,
//         port:3000
//     });
//     open("http://localhost:3000/");
//
//     gulp.watch(app.srcPath+'*.html',['html']);
//     gulp.watch(app.srcPath+'js/*.js',['js']);
//     gulp.watch(app.srcPath+'css/*.css',['css']);
//     gulp.watch(app.srcPath+'images/*',['img']);
// });
// gulp.task('default', ['serve']);



//自动执行，生成http
gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: [app.buildPath],
        livereload: true,
        port: 58
    });

    open("http://localhost:58/")

    //监控
    gulp.watch(app.srcPath + '*.html', ['html']);
    gulp.watch(app.srcPath + 'js/*.js', ['js']);
    gulp.watch(app.srcPath + 'images/*', ['image']);
    gulp.watch(app.srcPath + 'css/*.css',['css']);
});


//默认任务

gulp.task('default', ['serve']);