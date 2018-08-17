import './assets/css/index.scss';
import './assets/js/index.js';
import Vue from 'vue'
import PostEdit from './components/PostEdit.vue'

new Vue({
  render: h => h(PostEdit)
}).$mount('#app')