<script lang="ts">
  import type { MappedFuelData } from "src/routes/+layout";
  import Button from "./Button.svelte";
  import Graph from "./Graph.svelte";

  interface GraphValues {
    x: string;
    y: number;
  }

  type CompanyDateFilteredEntries = GraphValues[];

  export let fuelData: MappedFuelData;
  export let currentFuelType: string;
  $: days = 31;

  const changeDaysAmount = (newAmount: number) => {
    days = newAmount;
    priorDate = new Date(new Date().setDate(today.getDate() - days));
  };
  const timescaleOptions = [
    { text: "Week", days: 7 },
    { text: "Month", days: 31 },
    { text: "Year", days: 365 },
    { text: "All Time", days: 1000 },
  ];

  const today = new Date();
  let priorDate = new Date(new Date().setDate(today.getDate() - 31));

  const mapGraphData = (
    fuelData: MappedFuelData,
    currentFuelType: string,
    priorDate: Date
  ) => {
    const dateFilteredEntries: CompanyDateFilteredEntries[] = [];
    Object.keys(fuelData).forEach((company) => {
      const companyFilteredData = fuelData[company][currentFuelType]
        .filter((fuelEntry) => {
          const date = new Date(fuelEntry.last_update);
          return priorDate < date;
        })
        .map((fuelEntry) => {
          return { x: fuelEntry.last_update, y: fuelEntry.price };
        });

      dateFilteredEntries.push(companyFilteredData);
    });
    const mappedGraphData = {
      circlek: dateFilteredEntries[0],
      preem: dateFilteredEntries[1],
      ingo: dateFilteredEntries[2],
      okq8: dateFilteredEntries[3],
    };

    return mappedGraphData;
  };

  $: mappedGraphData = mapGraphData(fuelData, currentFuelType, priorDate);
</script>

<section>
  <h2>Historic Data</h2>
  <p>See who is the cheapest over time and how fuel prices trend</p>
  <div class="timescale-buttons">
    {#each timescaleOptions as timescale}
      <Button
        selected={days === timescale.days}
        on:click={() => changeDaysAmount(timescale.days)}
        >{timescale.text}</Button
      >
    {/each}
  </div>
  {#key mappedGraphData}
    <Graph {mappedGraphData} />
  {/key}
</section>

<style>
  h2 {
    padding-top: 1rem;
  }

  .timescale-buttons {
    display: flex;
  }
</style>
