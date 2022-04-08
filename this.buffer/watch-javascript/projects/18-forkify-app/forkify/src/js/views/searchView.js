class SearchView {
  _root = document.querySelector(".search");

  getQuery() {
    const query = this._root.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._root.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._root.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
