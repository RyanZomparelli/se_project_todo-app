import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/todo.js";
import { FormValidator } from "../components/formValidator.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list"); //Still using for now but get rid of later
const formValidator = new FormValidator(validationConfig, addTodoForm);

formValidator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  todosList.append(todo.getView());
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Creates and renders new todo items
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  generateTodo(values);
  formValidator.resetValidation();
  closeModal(addTodoPopup);
});

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    const todoElement = todo.getView();
    todoListSection.setItem(todoElement);
  },
  containerSelector: ".todos__list",
});

todoListSection.renderItems();

// !! Now uses the Section object !! See above
// Creates and renders initial todos
// initialTodos.forEach((item) => {
//   generateTodo(item);
// });
