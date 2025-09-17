/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a The first string.
 * @param {string} b The second string.
 * @returns {number} The Levenshtein distance.
 */
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Finds the best match for a search term from a list of country objects.
 * It prioritizes exact code matches (cca2, cioc, cca3, fifa) before falling back to
 * a comprehensive Levenshtein distance search across all common, official, native, and translated names.
 * @param {string} searchTerm The user's search term.
 * @param {object[]} countriesArray The array of country objects returned from the API.
 * @returns {object|null} The best matching country object, or null if none found.
 */
export const findBestMatch = (searchTerm, countriesArray) => {
  if (!countriesArray || countriesArray.length === 0) return null;
  if (countriesArray.length === 1) return countriesArray[0];

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const codeFields = ["cca2", "cca3", "cioc", "fifa"];
  for (const field of codeFields) {
    const exactCodeMatch = countriesArray.find(
      (country) => country[field]?.toLowerCase() === lowerCaseSearchTerm
    );
    if (exactCodeMatch) {
      return exactCodeMatch;
    }
  }

  let bestMatch = {
    country: null,
    distance: Infinity,
  };

  countriesArray.forEach((country) => {
    const namesToSearch = [country.name.common, country.name.official];

    if (country.name.nativeName) {
      Object.values(country.name.nativeName).forEach((native) => {
        namesToSearch.push(native.common, native.official);
      });
    }

    if (country.translations) {
      Object.values(country.translations).forEach((translation) => {
        namesToSearch.push(translation.common, translation.official);
      });
    }

    const uniqueNames = [...new Set(namesToSearch.filter(Boolean))];

    let minDistanceForCountry = Infinity;
    for (const name of uniqueNames) {
      const distance = levenshteinDistance(
        lowerCaseSearchTerm,
        name.toLowerCase()
      );
      if (distance < minDistanceForCountry) {
        minDistanceForCountry = distance;
      }
    }

    if (minDistanceForCountry < bestMatch.distance) {
      bestMatch.distance = minDistanceForCountry;
      bestMatch.country = country;
    }
  });

  return bestMatch.country;
};
