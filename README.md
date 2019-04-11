- [Purpose](#Purpose)
- [Structures](#Structures)

## Purpose
Project was built for learning React, Redux and React-Router.

## Structures
```
│   .babelrc
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   webpack.config.js
│
├───dist
└───src
    │   index.html
    │   index.jsx
    │   store.jsx
    │
    ├───actions
    │       actionTypes.jsx
    │       index.jsx
    │
    ├───components
    │   ├───AddTodoComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───BOSComponent
    │   │   │   index.jsx
    │   │   │   style.scss
    │   │   │
    │   │   └───DocumentManagement
    │   │           doc_management.jsx
    │   │           ImportDocModal.jsx
    │   │           Maintable.jsx
    │   │
    │   ├───Footer
    │   │       index.jsx
    │   │
    │   ├───Header
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───HomepageComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───ImageComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───LoginComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───NomatchComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───TableComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───TodoContent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───TodoItemComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   ├───TodoListComponent
    │   │       index.jsx
    │   │       style.scss
    │   │
    │   └───VisibilityFilterBar
    │           index.jsx
    │           style.scss
    │
    ├───constants
    │       api.js
    │       common.js
    │       todolist.jsx
    │
    ├───images
    │       blackhole.png
    │
    ├───reducers
    │       compareHeight.jsx
    │       index.jsx
    │       todo.jsx
    │       userInfo.jsx
    │       visibilityFilter.jsx
    │
    ├───routes
    │       index.jsx
    │
    ├───styles
    │       style.scss
    │
    └───utils
            api.js
```

## 项目更新日志
#### 2019年4月11日
- 重构布局，实现头部固定，中间内容和尾部总和高度小于浏览器的高度，依旧以浏览器高度显示
- 删除`margin`左右的值，不然`width: 100vw`的情况下会出现滚动条

#### 2019年4月10日
- 实现`登录界面`，`主页面`跳转
- `主页面`中的子组件跳转加载
- `BOS`模块的雏形
- 登录后返回的数据，存储在`store`中
- 嵌套路由刷新后浏览器显示空白，可以在`webpack.config.js`中的`output`中设置`publicPath="/"`
- 嵌套路由跳转浏览器空白的问题，可以考虑一下`exact`的设置



