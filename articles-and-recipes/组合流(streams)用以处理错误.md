# 组合流(streams)用以处理错误

默认情况下，在流中触发错误会导致抛出异常，除非已经给其 `error` 事件上附加了给定的监听器。但是这样在使用管道流的时候就变得有点棘手了。

通过[gulp-util](https://github.com/gulpjs/gulp-util)的 `combine` 方法可以将多个流合并为一个流，这就意味着只需要在代码特定某一个地方监听 `error` 事件就行了。

下面是一个在 gulpfile 中使用合并流的例子：

```javascript
var combine = require('gulp-util').combine;
var uglify = require('uglify');
var gulp = require('gulp');

gulp.task('test', function() {
    var combined = combine(
        gulp.src('bootstrap/js/*.js'),
        uglify(),
        gulp.dest('public/boostrap')
    );
    
    // 前面所有任务的错误都会在下面的代码中捕获，而不会抛出异常
    combined.on('error', function(err) {
        console.warn(err.message);
    });
    
    return combined;
});
```

也可以在 gulp 插件和 node 以及使用 [multipipe](http://npmjs.org/package/multipipe) 模块的过程中使用这个技术，这个非常有用，也意味着可以确保错误不会在人际罕见的 `./node_modules` 中排除错误。