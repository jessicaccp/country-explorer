import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

/**
 * @description Fetches a single country by its official cca3, cca2, or cioc code.
 * @param {string} code - The code of the country.
 * @returns {Promise<object[]>} A promise that resolves to the country data.
 */
export const fetchCountryByCode = async (code) => {
  const response = await apiClient.get(`/alpha/${code}`);
  return response.data;
};
