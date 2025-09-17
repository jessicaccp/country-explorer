import { findBestMatch } from "@/lib/similarity";
import { fetchCountryByName } from "@/services/api";
import { useEffect, useState } from "react";

export const useCountryData = (name) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const getCountryData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchCountryByName(name);
        const bestMatch = findBestMatch(name, data);
        setCountryData(bestMatch);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    getCountryData();
  }, [name]);

  return { countryData, loading, error };
};