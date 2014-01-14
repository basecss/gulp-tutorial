var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

// 新建一个 jshint 任务
gulp.task('jshint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// 压缩合并 js
gulp.task('uglify', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename('min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

// 合并 css
gulp.task('combocss', function() {
	return gulp.src('src/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build/css'));
});

// 优化图片
gulp.task('imagemin', function() {
	return gulp.src('src/img/**')
		.pipe(gulp.dest('build/img'))
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('build/img'))
});

// default task
gulp.task('default', function() {
	
	gulp.run('jshint', 'uglify', 'combocss', 'imagemin');
	
	// 监控文件变化
	gulp.watch('src/js/**', function(){
		gulp.run('jshint', 'uglify');
	});
	
	gulp.watch('src/css/**', function(){
		gulp.run('combocss');
	});
	
});