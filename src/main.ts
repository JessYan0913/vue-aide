import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import App from './App.vue';
import router from './router';

import './style.css';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
