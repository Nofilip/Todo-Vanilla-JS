export const renderBooks = (bookList) => {
  return bookList.map((book) => {
    return ` 
    <li>
    <span>${book.title} </span>
    
    <span>${book.description} </span>
    <input type="checkbox" ${book.sold ? "checked" : ""} />
    
    </li>
    `;
  });
};
