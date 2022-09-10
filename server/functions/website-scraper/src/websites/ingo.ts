import * as cheerio from "cheerio";
import axios from "axios";
import type { FormattedCompanyData } from "..";

const scrapedData: any = [];

const fetchIngoData = async () => {
  const { data, status } = await axios.get(
    "https://www.ingo.se/v%C3%A5ra-l%C3%A5ga-priser/v%C3%A5ra-l%C3%A5ga-priser/aktuella-listpriser"
  );
  if (status == 200) {
    const $ = cheerio.load(data);

    $("tbody > tr").each((i, el) => {
      const tds = $(el).find("td");

      const product = $(tds[1]).text().trim().split(" ").slice(1).join(" ");
      const price = $(tds[2]).text().trim().split(" ").slice(1).join(" ");
      const date = $(tds[3]).text().trim().split(" ").slice(1).join(" ");

      const row = { product, price, date };

      scrapedData.push(row);
    });
  }
  return scrapedData;
};

export const getFormattedIngoData = async () => {
  const rawData = await fetchIngoData();
  const mappedData: FormattedCompanyData = {
    name: "Ingo",
    petrol: {
      price: Number(rawData[0].price.split(",").join(".")),
      lastUpdated: rawData[0].date,
    },
    petrolPlus: {
      price: Number(rawData[1].price.split(",").join(".")),
      lastUpdated: rawData[1].date,
    },
    diesel: {
      price: Number(rawData[2].price.split(",").join(".")),
      lastUpdated: rawData[2].date,
    },
    ethanol: {
      price: Number(rawData[3].price.split(",").join(".")),
      lastUpdated: rawData[3].date,
    },
  };
  return mappedData;
};
