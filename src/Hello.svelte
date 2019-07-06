<script>
  import Inner from './Inner.svelte';
  let name = 'world';
</script>

<style>
</style>

<h1>Hello {name.toUpperCase()}!</h1>

<Inner/>