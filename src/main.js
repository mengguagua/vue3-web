import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 全局导入icon
// 扫描components下所有组件进行注册，优化import（build时按依赖引用也不会有冗余）
import globalComponents from './components/global'
import './service/api';
import {totalMixin} from './plugins/mixin/mixin';


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mixin(totalMixin)
app.use(globalComponents)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
