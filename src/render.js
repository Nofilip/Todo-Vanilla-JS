export const renderTodos = (todos) => {
  return todos
    .map((todo) => {
      return `
      <li data-id="${todo.id}">
          <input type="checkbox" ${todo.done ? "checked" : ""} />
          <span class="${todo.done ? "done" : ""}">${todo.text}</span>
          <button data-action="delete" type="button" >Ta bort</button>
      </li>   
    `;
    })
    .join("");
};
