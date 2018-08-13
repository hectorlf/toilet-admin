import './assets/css/index.scss';
import './assets/js/index.js';
import Vue from 'vue'
import PostList from './components/PostList.vue'

new Vue({
  render: h => h(PostList)
}).$mount('#app')