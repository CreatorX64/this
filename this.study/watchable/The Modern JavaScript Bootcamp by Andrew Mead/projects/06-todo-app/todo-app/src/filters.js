const filters =
{
  searchText: "",
  hideCompleted: false
};

// Expose filters to outside modules.
const getFilters = () => filters;

// Set filters to the updated values.
const setFilters = ({ searchText, hideCompleted }) =>
{
  if (typeof searchText === "string")
  {
    filters.searchText = searchText;
  }

  if (typeof hideCompleted === "boolean")
  {
    filters.hideCompleted = hideCompleted;
  }
};

export {
  getFilters,
  setFilters
};