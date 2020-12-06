<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  export let baseEndpointUrl = '';
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
    console.log("Loading tags from " + endpointUrl);
    axios.get(endpointUrl)
      .then(response => {
        console.log("Loaded");
        tags = response.data.elements;
      }).catch(error =>
        console.log("Error loading: " + error)
      );
  }

  function handleReload() {
    console.log("Reloading...");
    load()
  }

  onMount(async () => {
    load();
  });
</script>

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
        <a href="#" class="color-content"><i class="material-icons md-18">settings</i></a>
        <a href="#" class="color-content"><i class="material-icons md-18">clear</i></a>
      </td>
    </tr>
    {/each}{:else}
    <tr>
      <td colspan="4">{translations.noresults}</td>
    </tr>
    {/if}
  </tbody>
</table>

<button class="btn btn-primary btn-rounded ripple" on:click={handleReload}>
  <i class="material-icons list-icon">refresh</i>
  <span>{translations.refresh}</span>
</button>