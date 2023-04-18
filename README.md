# Vue 3 + Vite

## 注意
- vite配置文件指南：https://cn.vitejs.dev/config/server-options.html
- vue3+vite默认不支持使用`require`
- ui使用element-plus：https://element-plus.org/zh-CN/component/button.html
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
