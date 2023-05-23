# Vue 3 + Vite

## 注意
- vite配置文件指南：https://cn.vitejs.dev/config/server-options.html
- 配置文件路径：/vite.config.js
- vue3+vite默认不支持使用`require`
- ui使用antdv-vue：https://2x.antdv.com/components/table-cn（推荐）
- 全局默认样式在 /src/App.vue 文件里覆盖
- 图片都放置在public下，全路径引用。如：
```css
.lost-page {
  width: 30vw;
  height: 20vw;
  background: url('/public/images/404.jpg') no-repeat;
  background-size: 100% 100%;
}
```
- `@`默认不支持，不会转成`src/`
- import引入组件路径最后不能省略.vue
- icon使用规则，@iconify/vue。https://mengguagua.github.io/#/other/icon
- 项目内：组件，文件夹，业务代码，图片等各类命名，不允许用字母缩写，使用英文单词(自行谷歌翻译)
- 接口统一在interface.js里定义，不用分模块。
- 工具方法统一写在src/plugins/mixin/mixin.js文件内
- 公共组件统一写在src/components/global.js同目录内，此目录下组件做了统一注册操作。
- 业务组件(页面)，按模块建文件夹，文件夹内写各个业务组件(页面)
