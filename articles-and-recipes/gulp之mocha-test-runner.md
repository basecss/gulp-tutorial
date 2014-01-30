# gulp 之 Mocha test-runner

### 在所有测试中传递所有共享模块

```javascript
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('tests', function() {
    gulp.src(['test/test-*.js'], {read: **false**})
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});
```

### 文件变化时运行 mocha 测试

捆绑 `gulp.watch` 和 [`gulp-batch`](https://github.com/floatdrop/gulp-batch) (原因查看 gulp-batch readme)

```javascript
// npm install gulp gulp-watch gulp-mocha gulp-batch

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');
var gutil = require('gulp-util');

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.watch(['lib/**', 'test/**'], batch(function(events, cb) {
    gulp.run('mocha', cb);
}));
```

[`gulp-watch`](https://github.com/floatdrop/gulp-watch)插件:

```javascript
// npm i gulp gulp-watch gulp-mocha

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var gutil = require('gulp-util')

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.src(['lib/**', 'test/**'], { read: false })
        .pipe(watch(function(events, cb) {
            gulp.run('mocha', cb);
        }));
});

gulp.task('default', ['mocha', 'watch']);

// 运行 `gulp-watch` 或者 `gulp` 来监控和运行测试
```