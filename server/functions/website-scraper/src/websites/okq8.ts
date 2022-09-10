import * as cheerio from "cheerio";
import axios from "axios";
import type { FormattedCompanyData } from "..";

const scrapedData: any = [];

const fetchOkq8Data = async () => {
  const { data, status } = await axios.get(
    "https://www.okq8.se/pa-stationen/drivmedel/"
  );
  if (status == 200) {
    const $ = cheerio.load(data);

    $("tbody > tr").each((i, el) => {
      const tds = $(el).find("td");

      const product = $(tds[0]).text().trim();
      const price = $(tds[1]).text().trim().split(" ")[0];
      const date = $(tds[4]).text().trim();

      const row = { product, price, date };

      scrapedData.push(row);
    });
  }
  return scrapedData;
};

export const getFormattedOkq8Data = async () => {
  const rawData = await fetchOkq8Data();

  const mappedData: FormattedCompanyData = {
    name: "OKQ8",
    petrol: {
      price: Number(rawData[0].price.slice(0, 5).split(",").join(".")),
      lastUpdated: rawData[0].date,
    },
    petrolPlus: {
      price: Number(rawData[1].price.slice(0, 5).split(",").join(".")),
      lastUpdated: rawData[1].date,
    },
    diesel: {
      price: Number(rawData[2].price.split(",").join(".")),
      lastUpdated: rawData[2].date,
    },
    ethanol: {
      price: Number(rawData[5].price.split(",").join(".")),
      lastUpdated: rawData[5].date,
    },
    hvo: {
      price: Number(rawData[4].price.split(",").join(".")),
      lastUpdated: rawData[4].date,
    },
  };
  return mappedData;
};
