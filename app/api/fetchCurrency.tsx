export const fetchCurrency = async () => {
  const url =
    "https://gist.githubusercontent.com/manosim/aa81673cf0fe629ea4efb586bb7cfd3c/raw/635f8bcbc87c5907a08afca67ba0ddfe6b4b03f0/currencies.json";
  try {
    const currencies = await fetch(url);
    return currencies;
  } catch (error) {
    console.log(error);
  }
};
