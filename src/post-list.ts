import Vue from 'vue'
import PostList from './PostList.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(PostList, { props: { message: "Hello!" } })
}).$mount('#app')