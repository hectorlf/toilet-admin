<template>
          <div class="card">
            <div class="card-body">
              <div class="card-title"><a href="#" class="btn btn-primary">New Post</a></div>
              <div class="table-responsive">
                <table class="table">
                  <thead class=" text-primary">
                    <th>Id</th>
                    <th>Name</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
</template>

<script lang="ts">
import * as _ from 'lodash';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PostList extends Vue {
  items: Array<any> = [];

  loadData (): void {
    var vm = this;
    axios.get('post-list.json')
      .then(function (response) {
        console.log("Aha!")
        vm.items = response.data.results;
      })
      .catch(function (error) {
        console.log("Booo!")
      });
  }

  mounted () {
    this.loadData();
  }
}
</script>

<style>
</style>
