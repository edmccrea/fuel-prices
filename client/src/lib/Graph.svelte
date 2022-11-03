<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto/auto.mjs";

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
        plugins: [
          {
            afterDraw: (chart: any) => {
              if (chart.tooltip?._active?.length) {
                let x = chart.tooltip._active[0].element.x;
                let yAxis = chart.scales.y;
                let ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
                ctx.setLineDash([10, 10]);
                ctx.stroke();
                ctx.restore();
              }
            },
          } as any,
        ],
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
              radius: 0.5,
            },
            line: {
              borderCapStyle: "round",
              tension: 0.1,
              borderWidth: 2,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
      });
    }
  });
</script>

<canvas id="myChart" bind:this={chartCanvas} />

<style>
  canvas {
    max-width: 650px !important;
  }
</style>
