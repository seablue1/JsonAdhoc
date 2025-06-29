import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App2.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 使用Element Plus
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}