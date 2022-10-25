import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_KEY!
);

const webDataTemplate = [
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
  console.log("fetching");
  const latestDataBaseEntries = [];
  for (const company of webDataTemplate) {
    const companyData: any = {};
    companyData.name = company.name;

    for (const fuelType of company.fuelTypes) {
      let { data } = await supabase
        .from(company.name)
        .select("fuel_type, price, last_update, difference")
        .eq("fuel_type", fuelType)
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
  return { latestDataBaseEntries };
};
