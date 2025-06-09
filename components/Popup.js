export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButtonElement = document.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add("popup_visible");
  }

  close() {
    this._popupSelector.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButtonElement.addEventListener("click", () => {
      this.close();
    });

    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });

    document.addEventListener("keydown", this._handleEscapeClose);
  }
}
