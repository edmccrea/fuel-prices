<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  interface GraphValues {
    x: string;
    y: number;
  }

  type CompanyDateFilteredEntries = GraphValues[];

  export let mappedGraphData: Record<string, CompanyDateFilteredEntries>;

  let ctx;
  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
    const xAxisLabels: string[] = [];

    const dateRanges = Object.keys(mappedGraphData).map((company) => {
      return mappedGraphData[company].map((entry) => {
        return entry.x;
      });
    });

    dateRanges.forEach((range) => {
      range.forEach((date: string) => {
        if (!xAxisLabels.includes(date)) {
          xAxisLabels.push(date);
        }
      });
    });

    const yValues: Record<string, number[]> = {
      circlek: [],
      preem: [],
      ingo: [],
      okq8: [],
    };

    Object.keys(mappedGraphData).map((company) => {
      yValues[company] = mappedGraphData[company].map((entry) => {
        return entry.y;
      });
    });

    ctx = chartCanvas.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: xAxisLabels,
          datasets: [
            {
              label: "Circle K",
              borderColor: "#da291c",
              backgroundColor: "#da291c",
              data: yValues.circlek,
            },
            {
              label: "Preem",
              borderColor: "#01823b",
              backgroundColor: "#01823b",
              data: yValues.preem,
            },
            {
              label: "Ingo",
              borderColor: "#ff7000",
              backgroundColor: "#ff7000",
              data: yValues.ingo,
            },
            {
              label: "OKQ8",
              borderColor: "#20419a",
              backgroundColor: "#20419a",
              data: yValues.okq8,
            },
          ],
        },
        options: {
          responsive: true,
          elements: {
            point: {
              radius: 1,
            },
            line: {
              borderCapStyle: "round",
              tension: 0.1,
            },
          },
        },
      });
    }
  });
</script>

<canvas id="myChart" bind:this={chartCanvas} />

<style>
  canvas {
    max-width: 700px !important;
  }
</style>
