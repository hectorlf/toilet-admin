<script>
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import axios from 'axios';

  export let baseEndpointUrl = '';
  export let postId = '';
  const postsEndpointUrl = baseEndpointUrl + '/posts';

  let title = '';

  $: editing = postId == false;
  $: postEndpointUrl = baseEndpointUrl + '/posts/' + postId;

  function load() {
    if (editing) {
      console.log("Loading post from " + postEndpointUrl);
    } else {
      console.log("New post");
    }
    axios.get(postEndpointUrl).then(response => console.log("Loaded")).catch(error => console.log("Error loading"));
  }

  function handleSave() {
    if (editing) {
      console.log("Creating post at " + postsEndpointUrl);
    } else {
      console.log("Saving post at " + postEndpointUrl);
    }
    
    debouncedSave();
  }

  function save() {
    console.log("Saving...");
  }
  const debouncedSave = _.debounce(save, 5000);

  onMount(async () => {
    load();
  });
</script>

<h1>{#if editing}New post{:else}Editing post {postId}{/if}</h1>

<label for="title">Title</label><input name="title" bind:value={title}>

<button on:click={handleSave}>Save</button>