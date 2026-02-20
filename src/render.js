function escapeHtml(text) {
  let s = String(text);
  s = s.replaceAll("&", "&amp;");
  s = s.replaceAll("<", "&lt;");
  s = s.replaceAll(">", "&gt;");
  s = s.replaceAll('"', "&quot;");
  s = s.replaceAll("'", "&#39;");

  return s;
}

export const renderTodos = (todos, editingId) => {
  return todos
    .map((todo) => {
      const safeText = escapeHtml(todo.text);
      const isEditing = todo.id === editingId;
      return `
      <li data-id="${todo.id}">
          <input type="checkbox" ${todo.done ? "checked" : ""} />
          ${
            isEditing
              ? `<input class="edit-input" type="text" value="${safeText}" />`
              : `<span class="${todo.done ? "done" : ""}">${safeText}</span>`
          }
                    ${
                      isEditing
                        ? `<button data-action="save" type="button" >Save</button>
                           <button data-action="cancel" type="button" >Cancel</button>`
                        : `<button data-action="delete" type="button" >Erase</button>
                        <button data-action="edit" type="button" >Edit</button>`
                    }
      </li>   
    `;
    })
    .join("");
};
