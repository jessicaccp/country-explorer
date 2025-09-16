import { fetchAllCountries } from "@/services/api";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useCountries = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [processedCountries, setProcessedCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getAllCountriesData = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchAllCountries();
        setAllCountries(data);
        setProcessedCountries(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getAllCountriesData();
  }, []);

  useEffect(() => {
    let filtered = allCountries;
    if (debouncedSearchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    }
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.name.common.localeCompare(b.name.common);
        case "name-desc":
          return b.name.common.localeCompare(a.name.common);
        case "pop-desc":
          return b.population - a.population;
        case "pop-asc":
          return a.population - b.population;
        case "area-desc":
          return (b.area || 0) - (a.area || 0);
        case "area-asc":
          return (a.area || 0) - (b.area || 0);
        case "region-asc": {
          const regionCompare = (a.region || "").localeCompare(b.region || "");
          if (regionCompare !== 0) {
            return regionCompare;
          }
          return a.name.common.localeCompare(b.name.common);
        }
        default:
          return 0;
      }
    });

    setProcessedCountries(sorted);
    setCurrentPage(1);
  }, [allCountries, debouncedSearchTerm, selectedRegion, sortOrder]);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = processedCountries.slice(
      firstItemIndex,
      lastItemIndex
    );
    setDisplayedCountries(currentItems);
  }, [processedCountries, currentPage, itemsPerPage]);

  return {
    loading,
    error,
    displayedCountries,
    processedCountries,
    searchTerm,
    selectedRegion,
    sortOrder,
    itemsPerPage,
    currentPage,
    setSearchTerm,
    setSelectedRegion,
    setSortOrder,
    handleItemsPerPageChange,
    setCurrentPage,
  };
};
