import View from "./View";

class AddRecipeView extends View {
  _root = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded :)";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  addHandlerUpload(handler) {
    this._root.addEventListener("submit", (event) => {
      event.preventDefault();
      const dataArr = [...new FormData(this._root)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _addHandlerOpenModal() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerCloseModal() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
