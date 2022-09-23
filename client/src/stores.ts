import { writable } from "svelte/store";

export const latestFuelData = writable([
  {
    name: "OKQ8",
    petrol: { price: 18.68, lastUpdated: "2022-09-09", difference: -0.2 },
    petrolPlus: { price: 19.93, lastUpdated: "2022-09-09", difference: -0.2 },
    diesel: { price: 24.41, lastUpdated: "2022-09-09", difference: -0.35 },
    ethanol: { price: 15.87, lastUpdated: "2022-09-09", difference: -0.5 },
    hvo: { price: 30.67, lastUpdated: "2022-09-09", difference: -0.35 },
  },
  {
    name: "Preem",
    petrol: { price: 18.68, lastUpdated: "2022-09-09", difference: -0.2 },
    diesel: { price: 24.41, lastUpdated: "2022-09-09", difference: -0.35 },
    ethanol: { price: 15.87, lastUpdated: "2022-09-09", difference: -0.5 },
    hvo: { price: 27.23, lastUpdated: "2022-09-09", difference: -0.35 },
  },
  {
    name: "Circle K",
    petrol: { price: 18.53, lastUpdated: "2022-09-09", difference: -0.2 },
    petrolPlus: { price: 19.48, lastUpdated: "2022-09-09", difference: -0.2 },
    diesel: { price: 24.26, lastUpdated: "2022-09-09", difference: -0.35 },
    ethanol: { price: 15.72, lastUpdated: "2022-09-09", difference: -0.5 },
    hvo: { price: 30.67, lastUpdated: "2022-09-09", difference: -0.35 },
  },
  {
    name: "Ingo",
    petrol: { price: 18.43, lastUpdated: "2022-09-09", difference: -0.2 },
    petrolPlus: { price: 19.38, lastUpdated: "2022-09-09", difference: -0.2 },
    diesel: { price: 24.16, lastUpdated: "2022-09-09", difference: -0.35 },
    ethanol: { price: 15.62, lastUpdated: "2022-09-09", difference: -0.5 },
  },
]);
