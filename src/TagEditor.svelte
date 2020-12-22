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
  let tag = {};

  function load() {
    if (editing) {
      axios.get(endpointUrl + '/' + id)
        .then(response => {
          tag = response.data;
        }).catch(error =>
          console.log("Error loading: " + error)
        );
    }
  }

  function save() {
    if (editing) {
      console.log(tag)
      axios.put(endpointUrl + '/' + id, tag)
        .then(response => {
          console.log("Successfully updated tag: " + id);
        }).catch(error =>
          console.log("Error saving: " + error)
        );
    } else {
      axios.post(endpointUrl, tag)
        .then(response => {
          console.log("Successfully created tag: " + tag.name);
        }).catch(error =>
          console.log("Error saving: " + error)
        );
    }
  }

  function handleSave() {
    save();
    window.location = listUrl;
  }

  function handleCancel() {
    window.location = listUrl;
  }

  onMount(async () => {
    load();
  });
</script>

<form>
  <div class="row">
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" id="name" name="name" placeholder="A sample tag" type="text" bind:value={tag.name}>
        <small class="text-muted">This text will be escaped automatically when presented on the page</small>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Slug</label>
        <input class="form-control" id="slug" name="slug" placeholder="a-sample-tag" type="text" bind:value={tag.slug}>
        <small class="text-muted">This text is used in URLs, e.g. /tags/a-sample-tag, and must be URL-encoded</small>
      </div>
    </div>
  </div>
  <div class="form-actions btn-list">
    <button class="btn btn-primary btn-rounded" type="button" on:click={handleSave}>{translations.save}</button>
    <button class="btn btn-default btn-rounded" type="button" on:click={handleCancel}>{translations.cancel}</button>
  </div>
</form>