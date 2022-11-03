<script lang="ts">
  import { fade } from "svelte/transition";

  import type { MappedFuelData } from "../routes/+layout";
  import type { FuelEntry } from "../routes/+layout";
  import { formatCompanyName } from "$lib/helpers/format-company-name";

  export let fuelData: MappedFuelData;
  export let currentFuelType: string;

  const getLastIndex = (fuelDataArray: FuelEntry[]) => {
    return fuelDataArray[fuelDataArray.length - 1];
  };
</script>

<section>
  <table>
    <thead>
      <tr>
        <td>Company</td>
        <td>Price</td>
        <td>Difference</td>
        <td>Last Updated</td>
        <td>Last 7 Days</td>
      </tr>
    </thead>
    {#key currentFuelType}
      <tbody>
        {#each Object.keys(fuelData) as company}
          {#if fuelData[company][currentFuelType].length}
            <tr class="company-row">
              <td><a href={`/${company}`}>{formatCompanyName(company)}</a></td>
              <td
                ><a href={`/${company}`}
                  >{getLastIndex(fuelData[company][currentFuelType]).price}kr</a
                ></td
              >
              <td
                class="difference"
                class:higher={getLastIndex(fuelData[company][currentFuelType])
                  .difference > 0}
              >
                <a href={`/${company}`}
                  >{getLastIndex(fuelData[company][currentFuelType])
                    .difference}kr</a
                ></td
              >
              <td
                ><a href={`/${company}`}
                  >{getLastIndex(fuelData[company][currentFuelType])
                    .last_update}</a
                ></td
              >
              <td class="last-seven"><a href={`/${company}`}>Graph</a></td>
            </tr>
          {/if}
        {/each}
      </tbody>
    {/key}
  </table>
</section>

<style>
  section {
    overflow-x: auto;
  }
  table {
    margin: 1rem 0;
    border-collapse: collapse;
  }

  thead {
    background-color: var(--color-secondary-light);
  }

  thead td {
    padding: 0.5rem 1rem;
  }

  tbody {
    font-weight: var(--font-weight-light);
  }

  td {
    border-bottom: 1px solid var(--color-light-grey);
  }

  a {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
  }

  .difference {
    color: var(--color-success);
  }

  .higher {
    color: var(--color-error);
  }

  .last-seven {
    width: 200px;
  }

  .company-row:hover {
    background-color: var(--color-secondary-lighter);
    cursor: pointer;
  }
</style>
