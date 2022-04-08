import iconsUrl from "../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    this._insertIntoRoot(this._generateMarkup());
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${iconsUrl}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._insertIntoRoot(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._insertIntoRoot(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._insertIntoRoot(markup);
  }

  _insertIntoRoot(markup) {
    this._root.innerHTML = "";
    this._root.insertAdjacentHTML("afterbegin", markup);
  }
}
