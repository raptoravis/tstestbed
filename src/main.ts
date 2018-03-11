// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
const vueConfig = {
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
};

new Vue(vueConfig);

import './features/consolelog';
import './features/decorator';
import './features/proxy';
