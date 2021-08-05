const filters =
{
  searchText: "",
  sortBy: "byEdited"  // byEdited | byCreated | alphabetical
};

// Expose the filters object to other modules.
const getFilters = () => filters;

// Update filters array with given update values.
const setFilters = updates =>
{
  if (typeof updates.searchText === "string")
  {
    filters.searchText = updates.searchText;
  }

  if (typeof updates.sortBy === "string")
  {
    filters.sortBy = updates.sortBy;
  }
};

export {
  getFilters,
  setFilters
};