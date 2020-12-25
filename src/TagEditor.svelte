<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let baseEndpointUrl = '';
  export let listUrl = '';
  export let id;
  export let translations = {
    name: ":name",
    slug: ":slug",
    count: ":count",
    actions: ":actions",
    noresults: ":no results",
    save: ":save",
    cancel: ":cancel"
  };

  const endpointUrl = baseEndpointUrl + '/tags';
  let editing = !!id;
  let loading = true;
  let tag = {};

  function load() {
    if (editing) {
      axios.get(endpointUrl + '/' + id)
        .then(response => {
          tag = response.data;
        }).catch(error =>
          console.log("Error loading: " + error)
          // show a popup error message
        );
    }
  }

  function save() {
    if (editing) {
      return axios.put(endpointUrl + '/' + id, tag)
        .then(response => {
          console.log("Successfully updated tag: " + id);
        });
    } else {
      return axios.post(endpointUrl, tag)
        .then(response => {
          console.log("Successfully created tag: " + tag.name);
        });
    }
  }

  function handleSave() {
    save()
      .then(response => {
        window.location = listUrl;
      })
      .catch(error => {
        console.log("Error saving: " + error);
        // show a popup error message
      });
  }

  function handleCancel() {
    window.location = listUrl;
  }

  onMount(async () => {
    load();
    loading = false;
  });
</script>

<form>
  <div class="row">
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" bind:value={tag.name} disabled={loading} class="form-control" placeholder="A sample tag">
        <small class="text-muted">This text will be escaped automatically when presented on the page</small>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Slug</label>
        <input id="slug" name="slug" type="text" bind:value={tag.slug} disabled={loading} class="form-control" placeholder="a-sample-tag">
        <small class="text-muted">This text is used in URLs, e.g. /tags/a-sample-tag, and must be URL-encoded</small>
      </div>
    </div>
  </div>
  <div class="form-actions btn-list">
    <button on:click={handleSave} disabled={loading} class="btn btn-primary btn-rounded" type="button">{translations.save}</button>
    <button on:click={handleCancel} disabled={loading} class="btn btn-default btn-rounded" type="button">{translations.cancel}</button>
  </div>
</form>