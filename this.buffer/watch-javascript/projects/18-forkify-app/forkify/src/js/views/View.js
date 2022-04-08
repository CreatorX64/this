import iconsUrl from "../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
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
