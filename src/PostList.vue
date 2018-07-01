<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import * as _ from 'lodash';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';


const AppProps = Vue.extend({
  props: {
    message: String
  }
})

@Component({
  components: {
  }
})
export default class PostList extends AppProps {
  loadData (): void {
    var vm = this;
    axios.get('post-list.json')
      .then(function (response) {
        console.log("Aha! " + vm.message)
      })
      .catch(function (error) {
        console.log("Booo!")
      });
  }

  debouncedLoadData (): void {}

  created () {
    this.debouncedLoadData = _.debounce(this.loadData, 2000);
  }

  mounted () {
    this.debouncedLoadData();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
