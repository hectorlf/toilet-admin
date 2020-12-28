<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let baseEndpointUrl = '';
  export let editUrl = '';
  export let labels = {
    name: ":name",
    slug: ":slug",
    count: ":count",
    actions: ":actions",
    noresults: ":no results",
    refresh: ":refresh",
    refreshing: ":refreshing",
    edit: ":edit",
    delete: ":delete"
  };

  const endpointUrl = baseEndpointUrl + '/tags';
  let loading = true;
  let tags = [];

  function load() {
    console.log("Loading list of tags");
    return axios.get(endpointUrl)
      .then(response => tags = response.data.elements);
  }
  function deleteTag(id) {
    console.log("Deleting tag with id " + id);
    return axios.delete(endpointUrl + "/" + id)
      .then(() => console.log("Deleted tag with id " + id));
  }

  function handleReload() {
    loading = true;
    load()
      .catch(error => console.log("Error loading: " + error))
      .finally(() => loading = false);
  }
  function handleEdit(id) {
    console.log("Editing tag with id " + id + " using URL " + editUrl);
    window.location = editUrl + "?id=" + id;
  }
  function handleDelete(id) {
    loading = true;
    deleteTag(id)
      .catch(error => console.log("Error deleting: " + error))
      .finally(() =>
        load().finally(() => loading = false)
      );
  }

  onMount(async () => {
    handleReload();
  });
</script>

<button class="btn btn-primary btn-rounded ripple" on:click={handleReload} disabled={loading}>
  <i class="material-icons list-icon">refresh</i>
  <span>{loading?labels.refreshing:labels.refresh}</span>
</button>

<table class="table table-striped">
  <thead>
     <tr>
      <th>{labels.name}</th>
      <th>{labels.slug}</th>
      <th>{labels.count}</th>
      <th>{labels.actions}</th>
    </tr>
  </thead>
  <tbody>
    {#if tags.length > 0}{#each tags as tag}
    <tr>
      <td>{tag.name}</td>
      <td>{tag.slug}</td>
      <td>{tag.count}</td>
      <td>
        <a class:disabled="{loading}" on:click|stopPropagation={handleEdit(tag.id)} title="{labels.edit}" href="#" class="color-content"><i class="material-icons md-18">edit</i></a>
        <a class:disabled="{loading}" on:click|stopPropagation={handleDelete(tag.id)} title="{labels.delete}" href="#" class="color-content"><i class="material-icons md-18">delete</i></a>
      </td>
    </tr>
    {/each}{:else}
    <tr>
      <td colspan="4">{labels.noresults}</td>
    </tr>
    {/if}
  </tbody>
</table>