import * as cheerio from "cheerio";
import axios from "axios";
import type { FormattedCompanyData } from "..";

const scrapedData: any = [];

const fetchCirclekData = async () => {
  const { data, status } = await axios.get(
    "https://www.circlek.se/drivmedel/drivmedelspriser"
  );
  if (status == 200) {
    const $ = cheerio.load(data);

    $("tbody > tr").each((i, el) => {
      const tds = $(el).find("td");

      const product = $(tds[1]).text().trim().split(" ").slice(1).join(" ");
      const price = $(tds[2]).text().trim().split(" ")[1];
      const date = $(tds[3]).text().trim().split(" ").slice(1).join(" ");

      const row = { product, price, date };

      scrapedData.push(row);
    });
  }
  return scrapedData;
};

export const getFormattedCirclekData = async () => {
  const rawData = await fetchCirclekData();
  const mappedData: FormattedCompanyData = {
    name: "Circle K",
    petrol: {
      price: Number(rawData[8].price.split(",").join(".")),
      lastUpdated: rawData[8].date,
    },
    petrolPlus: {
      price: Number(rawData[9].price.split(",").join(".")),
      lastUpdated: rawData[9].date,
    },
    diesel: {
      price: Number(rawData[10].price.split(",").join(".")),
      lastUpdated: rawData[10].date,
    },
    ethanol: {
      price: Number(rawData[11].price.split(",").join(".")),
      lastUpdated: rawData[11].date,
    },
    hvo: {
      price: Number(rawData[5].price.split(",").join(".")),
      lastUpdated: rawData[5].date,
    },
  };
  return mappedData;
};
