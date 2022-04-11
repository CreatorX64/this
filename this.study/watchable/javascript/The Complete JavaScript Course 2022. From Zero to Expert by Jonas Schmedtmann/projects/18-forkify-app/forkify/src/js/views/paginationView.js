import View from "./View";
import iconsUrl from "../../img/icons.svg";

class PaginationView extends View {
  _root = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._root.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      handler(Number(btn.dataset.goto));
    });
  }

  _generateMarkup() {
    const { results, currentPage, resultsPerPage } = this._data;
    const numPages = Math.ceil(results.length / resultsPerPage);

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, false);
    }

    // Another page
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupButton(currentPage, false)}
        ${this._generateMarkupButton(currentPage)}
      `;
    }

    // Page 1, and there are NO other pages
    return "";
  }

  _generateMarkupButton(currentPage, isNext = true) {
    const targetPage = isNext ? currentPage + 1 : currentPage - 1;

    return `
      <button data-goto="${targetPage}" class="btn--inline pagination__btn--${
      isNext ? "next" : "prev"
    }">
        <svg class="search__icon">
          <use href="${iconsUrl}#icon-arrow-${isNext ? "right" : "left"}"></use>
        </svg>
        <span>Page ${targetPage}</span>
      </button>
    `;
  }
}

export default new PaginationView();
