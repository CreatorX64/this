import iconsUrl from "../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [isRender=true] If false, return created markup string instead of rendering to the DOM
   * @returns {undefined | string} Markup string is returned if isRender=false
   * @this {Object} View instance
   * @author Hakan Guclu
   * @todo Finish implementation
   *
   */
  render(data, isRender = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!isRender) return markup;

    this._insertIntoRoot(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._root.querySelectorAll("*"));

    newElements.forEach((newElem, i) => {
      const curElem = curElements[i];

      if (!newElem.isEqualNode(curElem)) {
        // Update changed text
        if (newElem.firstChild?.nodeValue.trim() !== "") {
          curElem.textContent = newElem.textContent;
        }

        // Update changed attributes
        Array.from(newElem.attributes).forEach((attr) =>
          curElem.setAttribute(attr.name, attr.value)
        );
      }
    });
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
