# 指定新的 cwd (current working directory)

有利于使用嵌套的目录结构，比如:

```javascript
/project
    /layer1
    /layer2
```

可以使用 `gulp` CLI 选项 `--cwd` 来修改当前工作目录。

比如在 `project` 目录执行以下操作:

    gulp --cwd ./layer1/
    
也可以使用 `process.chdir` 选项来处理这个操作，这只是一个普通的 Node 操作。

**`gulpfile.js`**

```javascript
var gulp = require('gulp');

try {
    process.chdir(gulp.env.cwd);
} catch(err) {
    console.error('Unable to chdir to %s', gulp.env.cwd);
}
```

如果只需要针对一个确定的 glob 指定 cwd，那么在 [glob-stream](https://github.com/wearefractal/glob-stream) 上使用 `cwd` 选项就可以了。

```javascript
gulp.src('../some/dir/**/*.js', {cwd: './public'});
```