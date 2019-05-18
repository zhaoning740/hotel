# 后台管理系统

## 技术栈

> Vue 2.6 + Vue router 3.0 + iview 3.4 + sass

## 开发

```bash
npm install

npm run serve
```

浏览器访问 `127.0.0.1:3000`

默认使用`hash`路由方式，如需修改，在`src/router.js`

修改代理去 `webpack/webpack.config.js`

## 注意事项

- 改请求地址在 `src/base/uri.js`

## 线上打包

```bash
npm run build
```
打包文件在 `dist/` 下