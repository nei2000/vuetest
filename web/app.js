import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
require('element-ui/lib/theme-default/index.css');

import App from './app.vue';
new Vue({
    el: '#app',
    render: h => h(App)
});