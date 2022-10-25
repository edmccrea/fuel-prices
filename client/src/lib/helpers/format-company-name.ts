export const formatCompanyName = (companyName: string) => {
  switch (companyName) {
    case "circlek":
      return "Circle K";
    case "preem":
      return "Preem";
    case "ingo":
      return "Ingo";
    case "okq8":
      return "OKQ8";
    default:
      return "";
  }
};
