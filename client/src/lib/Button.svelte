<script></script>

<button on:click>
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
  }
</style>
