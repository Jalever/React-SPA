- [Purpose](#Purpose)
- [Structures](#Structures)

## Purpose
Project was built for learning React, Redux and React-Router.

## Structures
```
───src
    ├───actions
    ├───components
    │   ├───AddTodoComponent
    │   ├───Footer
    │   ├───Header
    │   ├───ImageComponent
    │   ├───TableComponent
    │   ├───TodoContent
    │   ├───TodoItemComponent
    │   ├───TodoListComponent
    │   └───VisibilityFilterBar
    ├───constants
    ├───images
    ├───reducers
    └───styles
```

## 项目更新日志
#### 2019年4月11日
- 重构布局，实现头部固定，中间内容和尾部总和高度小于浏览器的高度，依旧以浏览器高度显示

#### 2019年4月10日
- 实现`登录界面`，`主页面`跳转
- `主页面`中的子组件跳转加载
- `BOS`模块的雏形
- 登录后返回的数据，存储在`store`中
- 嵌套路由刷新后浏览器显示空白，可以在`webpack.config.js`中的`output`中设置`publicPath="/"`
- 嵌套路由跳转浏览器空白的问题，可以考虑一下`exact`的设置



