<template>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="card-title">New post</div>
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
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Status</div>
            </div>
          </div>
        </div>
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
export default class PostEdit extends AppProps {
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
</style>
