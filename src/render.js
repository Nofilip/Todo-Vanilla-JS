export const renderTodos = (todos) => {
  return todos
    .map((todo) => {
      return `
      <li data-id="${todo.id}">
          <input type="checkbox" ${todo.done ? "checked" : ""} />
          <span class="${todo.done ? "done" : ""}">${todo.text}</span>
          <button type="button" data-action="delete">Ta bort</button>
      </li>   
    `;
    })
    .join("");
};
