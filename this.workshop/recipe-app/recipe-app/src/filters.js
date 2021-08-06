const filters =
{
  searchText: "",
  hideMissing: false
};

// Expose filters to outside modules.
const getFilters = () => filters;

// Update filters with the given updates.
const setFilters = (updates) =>
{
  if (typeof updates.searchText === "string")
  {
    filters.searchText = updates.searchText.toLowerCase();
  }

  if (typeof updates.hideMissing === "boolean")
  {
    filters.hideMissing = updates.hideMissing;
  }
};

export {
  getFilters,
  setFilters
};