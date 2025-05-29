import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._selector = selector;
  }

  _toggleCheckBox() {
    this._completed = !this._completed;
  }

  _setEventListeners() {
    this._todoDeleteBtnEl.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoElement = null;
    });

    this._todoCheckboxEl.addEventListener("click", () => {
      this._toggleCheckBox();
    });
  }

  getView() {
    // todo template element
    const todoElement = document
      .querySelector("#todo-template")
      .content.querySelector(".todo")
      .cloneNode(true);

    this._todoElement = todoElement;

    // todo name element
    const todoNameEl = todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._name;

    // todo checkbox and label elements
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabelEl = todoElement.querySelector(".todo__label");
    this._todoCheckboxEl = todoCheckboxEl;
    todoCheckboxEl.checked = this._completed;
    todoCheckboxEl.id = uuidv4();
    todoLabelEl.setAttribute("for", `${todoCheckboxEl.id}`);

    // todo date element
    const todoDateEl = todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    // todo delete button element
    // see _setEventListeners()
    const todoDeleteBtnEl = todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtnEl = todoDeleteBtnEl;

    this._setEventListeners();
    return todoElement;
  }
}

export { Todo };
