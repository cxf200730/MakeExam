import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { saveAs } from 'file-saver';

import axios from './http'

const app = createApp(App)
app.config.globalProperties.$axios = axios;

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
