import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/todo.js";
import { FormValidator } from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const formValidator = new FormValidator(validationConfig, addTodoForm);

formValidator.enableValidation();

const popupForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    //   // Create a date object and adjust for timezone
    formValues.date = new Date(formValues.date);
    formValues.date.setMinutes(
      formValues.date.getMinutes() + formValues.date.getTimezoneOffset()
    );

    const todo = new Todo(formValues, "#todo-template");
    todoListSection.addItem(todo.getView());
    formValidator.resetValidation();
    popupForm.close();
  },
});

popupForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupForm.open();
});

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    const todoElement = todo.getView();
    todoListSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

todoListSection.renderItems();
