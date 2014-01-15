# 使用 coffe-script 编写 gulpfile

在 [issue#103](https://github.com/gulpjs/gulp/issues/103) 中有讨论，目前有两种方式可以做到。

1. 在命令行使用 `gulp --require coffee-script`
2. 在 `gulpfile.js` 中在引入 `coffee-script` 之后引入 `gulpfile.coffee`

**gulpfile:**

```javascript
require('coffee-script');
require('./gulpfile.coffee');
```

**gulpfile.coffee:**

```javascript
gulp = require 'gulp'

gulp.task 'default', ->
    console.log('default task called')
```