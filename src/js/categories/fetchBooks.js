export function fetchCategories() {
  return fetch(`https://books-backend.p.goit.global/books/category-list`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
    
  );
}

export function fetchBooks(cateroryName) {
  return fetch(
    `https://books-backend.p.goit.global/books/category?category=${cateroryName}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
