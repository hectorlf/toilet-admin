<template>
  <div>
    <textarea v-model="content"></textarea>
    <button @click="send">Send</button>
  </div>
</template>

<script>
module.exports = {
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
}
</script>

<style scoped>
</style>
