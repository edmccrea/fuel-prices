<script>
  export let selected = false;
</script>

<button on:click class:selected>
  <slot>Button</slot>
</button>

<!-- This isn't reuable at all in this state. Make it as reusable as possible -->
<style>
  button {
    border-radius: 15px;
    background-color: var(--color-light-grey);
    padding: 5px 10px;
    margin-right: 1rem;
    min-width: 70px;
    font-weight: var(--font-weight-light);
    font-size: var(--text-sm);
    transition: all 200ms ease;
  }

  button:hover,
  .selected {
    background-color: var(--color-grey);
  }
</style>
