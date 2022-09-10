import * as cheerio from "cheerio";
import axios from "axios";
import type { FormattedCompanyData } from "..";

const scrapedData: any = [];

const fetchPreemData = async () => {
  const { data, status } = await axios.get(
    "https://www.preem.se/privat/drivmedel/drivmedelspriser"
  );
  if (status == 200) {
    const $ = cheerio.load(data);
    $("tbody > tr").each((i, el) => {
      const tds = $(el).find("td");

      const product = $(tds[0]).text();
      const price = $(tds[1]).text().trim().split(" ")[0];
      const date = $(tds[2]).text().trim();

      const row = { product, price, date };

      scrapedData.push(row);
    });
  }
  return scrapedData;
};

export const getFormattedPreemData = async () => {
  const rawData = await fetchPreemData();
  const mappedData: FormattedCompanyData = {
    name: "Preem",
    petrol: {
      price: Number(rawData[1].price.split(",").join(".")),
      lastUpdated: `20${rawData[1].date}`,
    },
    diesel: {
      price: Number(rawData[0].price.split(",").join(".")),
      lastUpdated: `20${rawData[0].date}`,
    },
    ethanol: {
      price: Number(rawData[3].price.split(",").join(".")),
      lastUpdated: `20${rawData[3].date}`,
    },
    hvo: {
      price: Number(rawData[2].price.split(",").join(".")),
      lastUpdated: `20${rawData[2].date}`,
    },
  };
  return mappedData;
};
