<script>
  import Button from "$lib/Button.svelte";
  import PriceTable from "$lib/PriceTable.svelte";
  const fuelTypes = ["95", "Diesel", "98", "E85", "HVO"];

  let fuelName = "petrol";

  const changeFuelType = (e) => {
    console.log(e);
  };
</script>

<section>
  <div class="title">
    <h1>Drivmedel Priser <span>Nu</span></h1>
    <p>
      Check out the advertised costs of fuel from the main suppliers each day
    </p>
  </div>

  <div class="table-buttons">
    {#each fuelTypes as fuelName}
      <Button on:click={changeFuelType}>{fuelName}</Button>
    {/each}
  </div>
  <PriceTable {fuelName} />
</section>

<style>
  section {
    max-width: 960px;
    margin: 0 auto;
    min-height: calc(100vh - 180px);
  }

  .title {
    margin: 3rem 0 2rem;
  }

  h1 {
    font-size: 54px;
  }

  span {
    color: var(--color-secondary);
  }

  .table-buttons {
    display: flex;
  }
</style>
