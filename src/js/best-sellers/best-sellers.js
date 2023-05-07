
import { fetchTopBooks } from "./fetchTopBooks";


fetchTopBooks().then(dataMarkupAll).catch();

const ulBooksList = document.querySelector('.books-list');
const divBooksList = document.querySelector('.books-list-wrapper');

function dataMarkupAll(data) {
  const dataMarkupAll = data
    .map(elem => {
      console.log(elem);
      for (let i = 0; i <= 5; i++)
        return `
        <li class="caterory"><h2 class="category-title">${elem.list_name}</h2>
        <ul class="category-top-books">
        <a href=""><li><img class="best-img" src="${elem.books[0].book_image}" width='180px' height='256px' alt="${elem.books[0].title}"><h3 class = "book-name" >${elem.books[0].title}</h3><p class= "book-author">${elem.books[0].author}</p></li></a>
        <a href=""><li><img class="best-img" src="${elem.books[1].book_image}" width='180px' height='256px' alt="${elem.books[1].title}"><h3 class = "book-name" >${elem.books[1].title}</h3><p class= "book-author">${elem.books[1].author}</p></li></a>
        <a href=""><li><img class="best-img" src="${elem.books[2].book_image}" width='180px' height='256px' alt="${elem.books[2].title}"><h3 class = "book-name" >${elem.books[2].title}</h3><p class= "book-author">${elem.books[2].author}</p></li></a>
        <a href=""><li><img class="best-img" src="${elem.books[3].book_image}" width='180px' height='256px' alt="${elem.books[3].title}"><h3 class = "book-name" >${elem.books[3].title}</h3><p class= "book-author">${elem.books[3].author}</p></li></a>
        <a href=""><li><img class="best-img" src="${elem.books[4].book_image}" width='180px' height='256px' alt="${elem.books[4].title}"><h3 class = "book-name" >${elem.books[4].title}</h3><p class= "book-author">${elem.books[4].author}</p></li></a>
        </ul> 
        <button data-filter="${elem.list_name}" class="list-name list-name-btn">see more</button>
        </li>`;
    })
    .join(' ');
  ulBooksList.innerHTML = dataMarkupAll;

  const dataMarkupTitle = `
    <h1 class="best-title" >Best Sellers <span class="best-title-span">Books</span></h1>`;
  divBooksList.innerHTML = dataMarkupTitle;
}
