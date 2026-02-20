import "./style.css";
import { todos } from "./state.js";
import { renderTodos } from "./render.js";

const listEl = document.querySelector("#todo-list");
const itemsLeftEl = document.querySelector("#items-left");
let currentFilter = "all";
let editingId = null;

const formEl = document.querySelector("#todo-form");
const inputEl = document.querySelector("#todo-input");

const eraseEl = document.querySelector("#clear-completed");

const filtersEl = document.querySelector("#filters");

const filterBtns = document.querySelectorAll(".filter-btn");

const emptyEl = document.querySelector("#empty-state");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function update() {
  saveTodos();
  render();
}

/// Save-function

function saveEditFromLi(li) {
  const id = Number(li.dataset.id);

  const input = li.querySelector(".edit-input");
  if (!input) return;

  const newText = input.value.trim();
  if (!newText) return;

  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.text = newText;
  editingId = null;
  update();
}

//// Show whole todo-list and filters

function render() {
  let visibleTodos = todos;

  if (currentFilter === "active") {
    visibleTodos = todos.filter((t) => !t.done);
  } else if (currentFilter === "completed") {
    visibleTodos = todos.filter((t) => t.done);
  }

  if (visibleTodos.length === 0) {
    emptyEl.textContent = "Inga todos här";
  } else {
    emptyEl.textContent = "";
  }

  listEl.innerHTML = renderTodos(visibleTodos, editingId);
  let editInput = document.querySelector(".edit-input");
  if (editInput) {
    editInput.focus();
    editInput.select();
  }

  const completedCount = todos.filter((t) => t.done).length;
  const total = todos.length;
  const itemsLeft = todos.filter((t) => !t.done).length;

  eraseEl.disabled = completedCount === 0;
  itemsLeftEl.textContent = `${itemsLeft} left • ${completedCount}/${total} done`;

  filterBtns.forEach((btn) => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/// Add a new Task

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
  inputEl.focus();

  update();
});

/// Changing on checkbox

listEl.addEventListener("change", (e) => {
  if (e.target.type !== "checkbox") return;

  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.done = !todo.done;

  update();
});

/// New block, combined listener

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const li = btn.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  const action = btn.dataset.action;
  /// Edit
  if (action === "edit") {
    editingId = id;
    render();
    return;
  }
  /// Delete
  if (action === "delete") {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return;
    const ok = confirm("Erase this task?");
    if (!ok) return;

    todos.splice(index, 1);
    if (editingId === id) {
      editingId = null;
    }
    update();
    return;
  }
  /// Save changes on task with click
  if (action === "save") {
    saveEditFromLi(li);
    return;
  }
  /// Cancel edit
  if (action === "cancel") {
    editingId = null;
    render();
    return;
  }
});

/// Erase all Todos

eraseEl.addEventListener("click", () => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done) todos.splice(i, 1);
  }
  update();
});

/// Filterbuttoms

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;

  currentFilter = btn.dataset.filter;

  render();
});

/// Save changes on task with enter

listEl.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (!e.target.classList.contains("edit-input")) return;

  const li = e.target.closest("li");
  if (!li) return;

  saveEditFromLi(li);
});

/// Localstorage

const saved = localStorage.getItem("todos");
if (saved) {
  const parsed = JSON.parse(saved);
  todos.splice(0, todos.length, ...parsed);
}

render();
inputEl.focus();
