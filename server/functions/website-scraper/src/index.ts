import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

import { getFormattedCirclekData } from "./websites/circlek";
import { getFormattedIngoData } from "./websites/ingo";
import { getFormattedOkq8Data } from "./websites/okq8";
import { getFormattedPreemData } from "./websites/preem";

export interface FormattedCompanyData {
  name: string;
  petrol: {
    price: number;
    lastUpdated: string;
    difference?: number;
  };
  petrolPlus?: {
    price: number;
    lastUpdated: string;
    difference?: number;
  };
  diesel: {
    price: number;
    lastUpdated: string;
    difference?: number;
  };
  ethanol: {
    price: number;
    lastUpdated: string;
    difference?: number;
  };
  hvo?: {
    price: number;
    lastUpdated: string;
    difference?: number;
  };
}

const main = async () => {
  const webData = await scrapeWebData();
  // console.log("web data", webData);
  const latestDatabaseEntries = await getLastDatabaseEntries(webData);
  // console.log("last database entry", latestDatabaseEntries);
  const databaseReadyData = formatTodaysData(webData, latestDatabaseEntries);
  // console.log("database ready data", databaseReadyData);
  await submitDataToDatabase(databaseReadyData);
};

const scrapeWebData = async () => {
  const okq8 = await getFormattedOkq8Data();
  const preem = await getFormattedPreemData();
  const circlek = await getFormattedCirclekData();
  const ingo = await getFormattedIngoData();

  return [okq8, preem, circlek, ingo];
};

//need to log errors and have retries
//what happens if web data is unexpected shape?
const getLastDatabaseEntries = async (webData: FormattedCompanyData[]) => {
  const latestDataBaseEntries: FormattedCompanyData[] = [];
  for (const company of webData) {
    const companyData: any = {};
    const keys = Object.keys(company);
    for (const key of keys) {
      if (key === "name") {
        companyData.name = company.name;
      }

      let { data } = await supabase
        .from(company.name.replace(/\s/g, "").toLowerCase())
        .select("fuel_type, price, last_update, difference")
        .eq("fuel_type", key)
        .order("id", { ascending: false })
        .limit(1);

      if (data?.length) {
        companyData[data[0].fuel_type] = {
          price: data[0].price,
          lastUpdated: data[0].last_update,
          difference: data[0].difference,
        };
      }
    }
    latestDataBaseEntries.push(companyData);
  }
  return latestDataBaseEntries;
};

const formatTodaysData = (webData: any, databaseEntries: any) => {
  const databaseReadyData: any = [];
  for (const company of webData) {
    const matchingData = databaseEntries.find(
      (entry: any) => entry.name === company.name
    );

    const formattedCompanyData: any = {};
    const keys = Object.keys(company);
    for (const key of keys) {
      if (key === "name") {
        formattedCompanyData.name = company.name;
      } else {
        if (company[key].lastUpdated !== matchingData[key].lastUpdated) {
          formattedCompanyData[key] = {
            price: company[key].price,
            lastUpdated: company[key].lastUpdated,
            difference: Number(
              (company[key].price - matchingData[key].price).toFixed(2)
            ),
          };
        }
      }
    }
    if (Object.keys(formattedCompanyData).length) {
      databaseReadyData.push(formattedCompanyData);
    }
  }
  return databaseReadyData;
};

const submitDataToDatabase = async (fuelPrices: any) => {
  for (const company of fuelPrices) {
    const keys = Object.keys(company);
    for (const key of keys) {
      if (key !== "name") {
        const { data, error } = await supabase
          .from(company.name.replace(/\s/g, "").toLowerCase())
          .insert([
            {
              fuel_type: key,
              price: company[key].price,
              last_update: company[key].lastUpdated,
              difference: company[key].difference,
            },
          ]);
        console.log(`Submitting ${key} for ${company.name}`);
      }
    }
  }
};

main();
