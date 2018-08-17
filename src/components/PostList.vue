<template>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title"><a @click="addPost()" class="btn btn-primary">New Post</a></div>
              <div class="table-responsive">
                <table class="table">
                  <thead class=" text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tfoot class="text-center" v-if="!isEmpty && !isLoading">
                    <tr>
                      <td colspan="2"><i class="fa fa-chevron-circle-left" style="opacity: 0.5"></i> 1 <i class="fa fa-chevron-circle-right" style="opacity: 0.5"></i></td>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                    </tr>
                    <tr v-if="isEmpty && !isLoading">
                      <td colspan="2"><i>No posts were returned this time...</i></td>
                    </tr>
                    <tr v-if="isLoading">
                      <td colspan="2"><i>Loading...</i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="loader-bar" v-if="isLoading"></div>
            </div>
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
  loading: boolean = false;
  items: Array<any> = [];

  loadData (): void {
    var vm = this;
    axios.get('post-list.json')
      .then(function (response) {
        vm.items = response.data.results;
        vm.loading = false;
      })
      .catch(function (error) {
        alert("An error occurred while loading posts");
        vm.items = [];
        vm.loading = false;
      });
  }

  addPost (): void {
    window.location.href = 'post-edit.html';
  }

  debouncedLoadData (): void {}

  created () {
    this.debouncedLoadData = _.debounce(this.loadData, 4000);
  }

  mounted () {
    this.loading = true;
    this.debouncedLoadData();
  }

  get isLoading (): boolean {
    return this.loading;
  }
  get isEmpty (): boolean {
    return this.items.length === 0;
  }
}
</script>

<style>
.loader-bar {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
}
.loader-bar:before{
  display: block;
  position: absolute;
  content: "";
  left: -200px;
  width: 60px;
  height: 4px;
  background-color: #fbc658;
  animation: loader-bar 2s linear infinite;
}
@keyframes loader-bar {
    from {left: -200px; width: 0%;}
    30% {width: 10%;}
    50% {width: 50%;}
    70% {width: 70%;}
    80% {left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
}
</style>