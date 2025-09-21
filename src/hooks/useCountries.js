import { fetchAllCountries } from "@/services/api";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

/**
 * @hook
 * @description A comprehensive hook that encapsulates all logic for fetching, filtering, sorting, and paginating the country data.
 *
 * @returns {object} An object containing all the necessary state and handlers for the UI.
 * - `loading` {boolean}: True if the initial country data is being fetched.
 * - `error` {boolean}: True if an error occurred during the fetch.
 * - `displayedCountries` {object[]}: The final, paginated array of countries to be rendered.
 * - `processedCountries` {object[]}: The full list of countries after filtering and sorting (pre-pagination).
 * - `searchTerm` {string}: The current value of the search input.
 * - `selectedRegion` {string}: The currently selected region for filtering.
 * - `sortOrder` {string}: The current sort order value.
 * - `itemsPerPage` {number}: The number of items to display per page.
 * - `currentPage` {number}: The current active page.
 * - `setSearchTerm` {Function}: State setter for the search term.
 * - `setSelectedRegion` {Function}: State setter for the selected region.
 * - `setSortOrder` {Function}: State setter for the sort order.
 * - `handleItemsPerPageChange` {Function}: Handler to change items per page and reset to page 1.
 * - `setCurrentPage` {Function}: State setter for the current page.
 *
 * @example
 * const { loading, displayedCountries, setSearchTerm } = useCountries();
 */
export const useCountries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [processedCountries, setProcessedCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get("region") || "all"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sort") || "name-asc"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get("limit")) || 12
  );

  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getAllCountriesData = async () => {
      const cachedCountries = sessionStorage.getItem("allCountries");

      if (cachedCountries) {
        const data = JSON.parse(cachedCountries);
        setAllCountries(data);
        setProcessedCountries(data);
        setLoading(false);
      } else {
        try {
          setError(false);
          setLoading(true);
          const data = await fetchAllCountries();
          sessionStorage.setItem("allCountries", JSON.stringify(data));
          setAllCountries(data);
          setProcessedCountries(data);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
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

  useEffect(() => {
    const params = {};

    if (debouncedSearchTerm) params.search = debouncedSearchTerm;
    if (selectedRegion && selectedRegion !== "all")
      params.region = selectedRegion;
    if (sortOrder !== "name-asc") params.sort = sortOrder;
    if (itemsPerPage !== 12) params.limit = itemsPerPage;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params, { replace: true });
  }, [
    debouncedSearchTerm,
    selectedRegion,
    sortOrder,
    itemsPerPage,
    currentPage,
    setSearchParams,
  ]);

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
