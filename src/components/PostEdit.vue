<template>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">New Post</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" placeholder="An ode to a beautiful idea..."/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Slug</label>
                    <input type="text" class="form-control" placeholder="ode-to-beautiful-idea"/>
                    <small class="form-text text-muted">The permanent URL of the post. Only letters, numbers and hyphens can be used.</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Introduction</label>
                    <textarea class="form-control textarea"></textarea>
                    <small class="form-text text-muted">This text will be treated as raw HTML.</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Body</label>
                    <textarea class="form-control textarea"></textarea>
                    <small class="form-text text-muted">This text will be treated as raw HTML.</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="ml-auto mr-auto">
                  <a @click="save()" class="btn btn-primary btn-round">Save Changes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Status</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-check form-check-radio">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                      Unpublished
                      <span class="form-check-sign"></span>
                    </label>
                  </div>
                  <div class="form-check form-check-radio">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
                      Published
                      <span class="form-check-sign"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="ml-auto mr-auto">
                  <a @click="save()" class="btn btn-primary btn-round">Update</a>
                </div>
              </div>
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
