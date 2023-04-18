import { defineAsyncComponent } from 'vue';
const components = import.meta.glob('./*.vue'); // 异步方式
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    app.component(name, defineAsyncComponent(value));
  }
}
