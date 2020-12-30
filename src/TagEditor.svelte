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
  const slugRegex = /^[\.\-_a-z0-9]+$/;
  let editing = !!id;
  let loading = true;
  let saving = false;
  let tag = {};
  $: validName = !!tag.name;
  $: validSlug = !!tag.slug && slugRegex.test(tag.slug);
  $: valid = validName && validSlug;

  function load() {
    if (editing) {
      return axios.get(endpointUrl + '/' + id)
        .then(response => tag = response.data);
    } else {
      return Promise.resolve();
    }
  }

  function save() {
    console.log("validSlug is " + validSlug);
    if (editing) {
      return axios.put(endpointUrl + '/' + id, tag)
        .then(() => console.log("Successfully updated tag: " + id + " with values: " + tag));
    } else {
      return axios.post(endpointUrl, tag)
        .then(() => console.log("Successfully created tag: " + tag));
    }
  }

  function handleLoad() {
    loading = true;
    load()
      .catch(error =>
        console.log("Error loading: " + error)
        // show a popup error message
      )
      .finally(() => loading = false);
  }
  function handleSave() {
    saving = true;
    save()
      .then(() => window.location = listUrl)
      .catch(error => {
        console.log("Error saving: " + error);
        // show a popup error message
        saving = false
      });
  }
  function handleCancel() {
    window.location = listUrl;
  }

  onMount(async () => {
    handleLoad();
  });
</script>

<form>
  <div class="row">
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" bind:value={tag.name} disabled={loading || saving} class:is-invalid="{!validName}" class="form-control" placeholder="A sample tag">
        <small class="text-muted">This text will be escaped automatically when presented on the page</small>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="form-group">
        <label for="name">Slug</label>
        <input id="slug" name="slug" type="text" bind:value={tag.slug} disabled={loading || saving} class:is-invalid="{!validSlug}" class="form-control" placeholder="a-sample-tag">
        <small class="text-muted">This text is used in URLs, e.g. /tags/a-sample-tag, and must be URL-encoded</small>
      </div>
    </div>
  </div>
  <div class="form-actions btn-list">
    <button on:click={handleSave} disabled={loading || !valid || saving} class="btn btn-primary btn-rounded" type="button">{loading?'Loading...':saving?'Saving...':translations.save}</button>
    <button on:click={handleCancel} disabled={saving} class="btn btn-default btn-rounded" type="button">{translations.cancel}</button>
  </div>
</form>