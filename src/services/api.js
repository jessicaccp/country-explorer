import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @description Fetches a list of all countries with a minimal set of fields.
 * @returns {Promise<object[]>} A promise that resolves to an array of country objects.
 */
export const fetchAllCountries = async () => {
  const response = await apiClient.get(
    "/all?fields=name,flags,population,region,capital,subregion,languages,currencies,borders,area"
  );
  return response.data;
};

/**
 * @description Fetches detailed information for a single country by its common name.
 * @param {string} name - The common name of the country to fetch.
 * @returns {Promise<object[]>} A promise that resolves to an array containing the matched country object(s).
 */
export const fetchCountryByName = async (name) => {
  const response = await apiClient.get(`/name/${name}`);
  return response.data;
};
