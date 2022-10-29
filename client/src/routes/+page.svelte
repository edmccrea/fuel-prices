<script lang="ts">
  import type { MappedFuelData } from "./+layout";
  import Button from "$lib/Button.svelte";
  import PriceTable from "$lib/PriceTable.svelte";
  const fuelTypes = [
    { displayName: "95", databaseName: "petrol" },
    { displayName: "Diesel", databaseName: "diesel" },
    { displayName: "98", databaseName: "petrolPlus" },
    { displayName: "E85", databaseName: "ethanol" },
    { displayName: "HVO", databaseName: "hvo" },
  ];

  $: currentFuelType = "petrol";

  const changeCurrentFuelType = (newFuelType: string) => {
    currentFuelType = newFuelType;
  };

  /** @type {import('./$types').PageData} */
  export let data: MappedFuelData;
</script>

<section>
  <div class="title">
    <h1>Drivmedel Priser <span>Nu</span></h1>
    <p>
      Check out the advertised costs of fuel from the main suppliers each day
    </p>
  </div>

  <div class="table-buttons">
    {#each fuelTypes as fuelType}
      <Button on:click={() => changeCurrentFuelType(fuelType.databaseName)}
        >{fuelType.displayName}</Button
      >
    {/each}
  </div>
  <PriceTable {currentFuelType} fuelData={data} />
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
