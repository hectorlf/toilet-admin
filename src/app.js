import Vue from 'vue';

Vue.component('post-form', {
  template: '<div><textarea v-model="content"/><button @click="send">Send</button></div>',
  data: function() {
    return {
      content: ""
    }
  },
  methods: {
    send: function() {
      this.$emit('send', this.content);
    }
  }
})

var app = new Vue({
  el: '#app',
  template: '<div><h1>Edit post</h1><post-form @send="val => warn(val)"></post-form></div>',
  methods: {
    warn: function(message) {
      alert(message);
    }
  }
})
