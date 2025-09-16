import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllCountries = async () => {
  const response = await apiClient.get(
    "/all?fields=name,flags,population,region,capital,subregion,languages,currencies,borders,area"
  );
  return response.data;
};

export const fetchCountryByName = async (name) => {
  const response = await apiClient.get(`/name/${name}`);
  return response.data;
};
