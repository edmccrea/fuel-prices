import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_KEY!
);

interface RawFuelData {
  companyName: string;
  data: FuelEntry[];
}

interface FuelEntry {
  id: number;
  fuel_type: string;
  price: number;
  difference: number;
  last_update: string;
}

type MappedCompanyData = Record<string, FuelEntry[] | []>;
export type MappedFuelData = Record<string, MappedCompanyData>;

const companyData = [
  {
    name: "circlek",
    fuelTypes: ["petrol", "petrolPlus", "diesel", "ethanol", "hvo"],
  },
  {
    name: "preem",
    fuelTypes: ["petrol", "diesel", "ethanol", "hvo"],
  },
  {
    name: "ingo",
    fuelTypes: ["petrol", "petrolPlus", "diesel", "ethanol"],
  },
  {
    name: "okq8",
    fuelTypes: ["petrol", "petrolPlus", "diesel", "ethanol", "hvo"],
  },
];

export const load = async () => {
  const rawFuelDataMap: RawFuelData[] = [];

  for (const company of companyData) {
    const res = await supabase.from(company.name).select("*");
    if (res.data) {
      rawFuelDataMap.push({
        companyName: company.name,
        data: res.data,
      });
    }
  }

  const mapFuelData = (rawFuelData: RawFuelData[]) => {
    const mappedFuelData: MappedFuelData = {
      circlek: {},
      preem: {},
      ingo: {},
      okq8: {},
    };
    // const mappedFuelData: MappedFuelData = {};
    rawFuelData.forEach((company: RawFuelData) => {
      const companyData: MappedCompanyData = {
        petrol: [],
        petrolPlus: [],
        diesel: [],
        ethanol: [],
        hvo: [],
      };
      company.data.forEach((entry) => {
        const fuelType: FuelEntry[] = companyData[entry.fuel_type];
        fuelType.push(entry);
      });
      const companyName = company.companyName;
      mappedFuelData[companyName] = companyData;
    });
    return mappedFuelData;
  };

  const mappedFuelData = mapFuelData(rawFuelDataMap);
  return mappedFuelData;
};
