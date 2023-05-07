export async function fetchTopBooks(book) {
  const response = await fetch(`https://books-backend.p.goit.global/books/top-books`);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}