<template>
  <div>
    <h1>Edit post</h1>
    <post-form @send="val => warn(val)"></post-form>
  </div>
</template>

<script>
import PostForm from './post-form.vue';

export default {
  methods: {
    warn: function(message) {
      alert(message);
    }
  },
  components: {
    PostForm
  }
}
</script>

<style scoped>
</style>
