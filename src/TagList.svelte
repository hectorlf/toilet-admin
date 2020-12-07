<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let baseEndpointUrl = '';
  export let editUrl = '';
  export let translations = {
    name: ":name",
    slug: ":slug",
    count: ":count",
    actions: ":actions",
    noresults: ":no results",
    refresh: ":refresh"
  };

  const endpointUrl = baseEndpointUrl + '/tags';
  let tags = [];

  function load() {
    axios.get(endpointUrl)
      .then(response => {
        tags = response.data.elements;
      }).catch(error =>
        console.log("Error loading: " + error)
      );
  }

  function handleReload() {
    load();
  }
  function handleEdit(id) {
    console.log("Editing tag with id " + id + " using URL " + editUrl);
    window.location = editUrl + "?id=" + id;
  }
  function handleDelete(id) {
    console.log("Deleting tag with id " + id);
    axios.delete(endpointUrl + "/" + id)
      .then(response => {
        console.log("Deleted tag with id " + id);
      }).catch(error =>
        console.log("Error deleting: " + error)
      );
    load();
  }

  onMount(async () => {
    load();
  });
</script>

<button class="btn btn-primary btn-rounded ripple" on:click={handleReload}>
  <i class="material-icons list-icon">refresh</i>
  <span>{translations.refresh}</span>
</button>

<table class="table table-striped">
  <thead>
     <tr>
      <th>{translations.name}</th>
      <th>{translations.slug}</th>
      <th>{translations.count}</th>
      <th>{translations.actions}</th>
    </tr>
  </thead>
  <tbody>
    {#if tags.length > 0}{#each tags as tag}
    <tr>
      <td>{tag.name}</td>
      <td>{tag.slug}</td>
      <td>{tag.count}</td>
      <td>
        <a href="#" class="color-content" on:click|stopPropagation={handleEdit(tag.id)}><i class="material-icons md-18">edit</i></a>
        <a href="#" class="color-content" on:click|stopPropagation={handleDelete(tag.id)}><i class="material-icons md-18">delete</i></a>
      </td>
    </tr>
    {/each}{:else}
    <tr>
      <td colspan="4">{translations.noresults}</td>
    </tr>
    {/if}
  </tbody>
</table>