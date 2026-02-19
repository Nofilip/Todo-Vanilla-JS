import "./style.css";
import { todos } from "./state.js";
import { renderTodos } from "./render.js";

const listEl = document.querySelector("#todo-list");
const itemsLeftEl = document.querySelector("#items-left");

const formEl = document.querySelector("#todo-form");
const inputEl = document.querySelector("#todo-input");

/// Lägg till ny Todo

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputEl.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now(),
    text,
    done: false,
  };
  todos.push(newTodo);
  inputEl.value = "";

  render();
});

//// Visa hela todo-listan

function render() {
  listEl.innerHTML = renderTodos(todos);

  const itemsLeft = todos.filter((t) => !t.done).length;
  itemsLeftEl.textContent = `${itemsLeft} kvar`;
}

/// Ändringar av checkboxen

listEl.addEventListener("change", (e) => {
  if (e.target.type !== "checkbox") return;

  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.done = !todo.done;

  render();
});

/// Radera en Todo

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest('button[data-action="delete"]');
  if (!btn) return;

  const li = btn.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return;

  todos.splice(index, 1);
  render();
});

render();
