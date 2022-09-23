<script lang="ts">
  import { latestFuelData } from "../stores";
  export let fuelType;
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
      {#each $latestFuelData as company}
        <tr class="company-row">
          <td>{company.name}</td>
          <td>{company.petrol.price}kr</td>
          <td>{company.petrol.difference}kr</td>
          <td>{company.petrol.lastUpdated}</td>
          <td class="last-seven">Graph</td>
        </tr>
      {/each}
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
