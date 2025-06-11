import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/todo.js";
import { FormValidator } from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

//DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

//Enable form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

//Add new todos upon form submission
const popupForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formInputValues) => {
    //Using data captured within the PopupWithForm class  // Create a date object and adjust for timezone
    formInputValues.date = new Date(formInputValues.date);
    formInputValues.date.setMinutes(
      formInputValues.date.getMinutes() +
        formInputValues.date.getTimezoneOffset()
    );
    //Pass formatted form inputs to create a new instance of the Todo class
    const todo = new Todo(formInputValues, "#todo-template", {
      //Use two seperate callbacks in the Todo class to handle the todo counter
      handleTodoDelete: (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      },
      handleTodoComplete: (isCompleted) => {
        isCompleted
          ? todoCounter.updateCompleted(true)
          : todoCounter.updateCompleted(false);
      },
    });
    //Create a DOM element from the new todo instance using todo's getView() method and
    // render it(add it to the DOM) using an instance of the Section class.
    todoListSection.addItem(todo.getView());
    //Reset the form after submission.
    formValidator.resetValidation();
    //Close the form after submission using a method inherited from the Popup class.
    popupForm.close();
    //Update the total todos when new todos are created
    todoCounter.updateTotal(true);
  },
});

//Sets the submission event listener and closing logic listeners on the form and popup
popupForm.setEventListeners();

//Sets the eventListener to open the popup
addTodoButton.addEventListener("click", () => {
  popupForm.open();
});

// Create and render todos from intialTodos array. Establishes the instance of
// the Section class used to render intital todos and new todos.
const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", {
      handleTodoDelete: (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      },
      handleTodoComplete: (isCompleted) => {
        isCompleted
          ? todoCounter.updateCompleted(true)
          : todoCounter.updateCompleted(false);
      },
    });

    todoListSection.addItem(todo.getView());
  },
  containerSelector: ".todos__list",
});

//Applies the renderer callback function to each data item.
todoListSection.renderItems();

//Creates a new instance of the TodoCounter so methods like updateTotal() or updateCompleted() are available.
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
