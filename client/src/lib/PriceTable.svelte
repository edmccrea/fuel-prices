<script lang="ts">
  import { formatCompanyName } from "$lib/helpers/format-company-name";

  export let fuelData;
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
        {#each fuelData as company}
          {#if company[currentFuelType]}
            <tr class="company-row">
              <td>{formatCompanyName(company.name)}</td>
              <td>{company[currentFuelType].price}kr</td>
              <td>{company[currentFuelType].difference}kr</td>
              <td>{company[currentFuelType].lastUpdated}</td>
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
