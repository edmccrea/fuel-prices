<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import Footer from "$lib/Footer.svelte";
</script>

<Navbar />
<section>
  <slot />
</section>

<Footer />

<style>
  section {
    min-height: calc(100vh - 120px);
    padding: 0 1rem;
    overflow-x: auto;
  }
</style>
