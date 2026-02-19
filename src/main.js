import "./style.css";
import { todos } from "./state.js";
import { renderTodos } from "./render.js";

const listEl = document.querySelector("#todo-list");
const itemsLeftEl = document.querySelector("#items-left");

listEl.innerHTML = renderTodos(todos);

const itemsLeft = todos.filter((t) => !t.done).length;
itemsLeftEl.textContent = `${itemsLeft} kvar`;
