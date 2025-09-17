import { fetchCountryByCode } from "@/services/api";
import { useEffect, useState } from "react";

export const useBorderCountries = (countryData) => {
  const [borderCountries, setBorderCountries] = useState([]);
  const [loadingBorders, setLoadingBorders] = useState(false);
  const [errorBorders, setErrorBorders] = useState(false);

  useEffect(() => {
    const getBorderCountries = async () => {
      if (countryData?.borders?.length > 0) {
        setErrorBorders(false);
        setLoadingBorders(true);
        try {
          const promises = countryData.borders.map((code) =>
            fetchCountryByCode(code)
          );
          const results = await Promise.all(promises);
          setBorderCountries(results.map((res) => res[0]));
        } catch {
          setErrorBorders(true);
        } finally {
          setLoadingBorders(false);
        }
      } else {
        setBorderCountries([]);
      }
    };

    getBorderCountries();
  }, [countryData]);

  return { borderCountries, loadingBorders, errorBorders };
};
