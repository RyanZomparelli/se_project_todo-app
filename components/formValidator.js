import { initialTodos, validationConfig } from "../utils/constants.js";

class FormValidator {
  constructor(settings, formEl) {
    this._form = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitBtnSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveBtnClass = settings.inactiveButtonClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveBtnClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveBtnClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._form.querySelector(this._submitBtnSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formElement = this._form;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners(formElement);
  }

  resetValidation() {
    this._form.reset();
    const buttonElement = this._form.querySelector(this._submitBtnSelector);
    buttonElement.classList.add(this._inactiveBtnClass);
    buttonElement.disabled = true;
  }
}

export { FormValidator };
