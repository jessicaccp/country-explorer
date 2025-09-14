import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllCountries = async () => {
    try {
        const response = await apiClient.get("/all")
        return response.data
    } catch (error) {
        console.log("Error fetching all countries:", error)
        throw error
    }
}

export const fetchCountryByName = async (name) => {
    try {
    const response = await apiClient.get(`/name/${name}`)
    return response.data
    } catch (error) {
        console.log(`Error fetching country by name ${name}:`, error)
        throw error
    }
}