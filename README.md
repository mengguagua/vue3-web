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

测试和生产url调用公司统一配置中心
```
console.log('dev运行:')
let request = require('request');
request('http://192.168.3.141:57163/api/web/config/downloadFile/5213', function(err, response, body){
  //err 当前接口请求错误信息
  //response 一般使用statusCode来获取接口的http的执行状态
  //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据
  //需要通过JSON.parse(body)来转换
  if(!err && response.statusCode == 200){
    console.log('接口回调2:')
    console.log(body)
    let res = JSON.parse(body);
    console.log(res)
  }
});
```
