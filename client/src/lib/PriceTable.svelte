<script lang="ts">
  import type { MappedFuelData } from "../routes/+layout";
  import { formatCompanyName } from "$lib/helpers/format-company-name";

  export let fuelData: MappedFuelData;
  export let currentFuelType: string;
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
    <tbody>
      {#key currentFuelType}
        {#each Object.keys(fuelData) as company}
          {#if fuelData[company][currentFuelType].length}
            <tr class="company-row">
              <td>{formatCompanyName(company)}</td>
              <td
                >{fuelData[company][currentFuelType][
                  fuelData[company][currentFuelType].length - 1
                ].price}kr</td
              >
              <td
                >{fuelData[company][currentFuelType][
                  fuelData[company][currentFuelType].length - 1
                ].difference}kr</td
              >
              <td
                >{fuelData[company][currentFuelType][
                  fuelData[company][currentFuelType].length - 1
                ].last_update}</td
              >
              <td class="last-seven">Graph</td>
            </tr>
          {/if}
        {/each}
      {/key}
    </tbody>
  </table>
</section>

<style>
  table {
    margin: 1rem 0;
    border-collapse: collapse;
  }

  thead {
    background-color: var(--color-secondary-light);
  }

  tbody {
    font-weight: var(--font-weight-light);
  }

  td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-light-grey);
  }

  .last-seven {
    width: 200px;
  }

  .company-row:hover {
    background-color: var(--color-secondary-light);
    cursor: pointer;
  }
</style>
