import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueExcelEditor from '../node_modules/vue3-excel-editor'
import {userStore} from '@/store/user'
import { setupAuth } from './permission'
import 'element-plus/dist/index.css'
import './permission'
import './mock'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue';


import 'ant-design-vue/dist/reset.css';
const app = createApp(App)
app.use(router)
setupAuth(app)
app.use(ElementPlus)
app.use(VueExcelEditor)
app.use(Antd);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')





