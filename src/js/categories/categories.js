import { fetchBooks, fetchAllBooks } from './fetchBooks.js';

const ulBooksList = document.querySelector('.books-list');
const divBooksList = document.querySelector('.books-list-wrapper');
const navList = document.querySelector('nav');
const listNames = document.querySelectorAll('li');

navList.addEventListener('click', onFiltred);

// fetchAllBooks().then(dataMarkupAll).catch();

function onFiltred(event) {
  event.preventDefault();
  if (event.target.tagName !== 'LI') return;

  let cateroryName = event.target.dataset['filter'];
  //   console.log(cateroryName);

  listNames.forEach(elem => {
    elem.classList.remove('acvite');
  });

  event.target.classList.add('acvite');
  if (cateroryName === 'All') {
    fetchAllBooks().then(dataMarkupAll).catch();
    return;
  }

  fetchBooks(cateroryName).then(dataMarkup).catch();
}

function dataMarkup(booksData) {
  const dataMarkup = booksData
    .map(bookData => {
      return `
      <a href="">
      <li><img src="${bookData.book_image}" width='180px' height='256px' alt="${bookData.title}"><h3>${bookData.title}</h3><p>${bookData.author}</p></li>
  </a>`;
    })
    .join(' ');
  ulBooksList.innerHTML = dataMarkup;

  const dataMarkupTitle = `<h2>${booksData[0].list_name}</h2>`;
  divBooksList.innerHTML = dataMarkupTitle;
}

// function dataMarkupAll(data) {
//   const dataMarkupAll = data
//     .map(elem => {
//       console.log(elem);
//       for (let i = 0; i <= 5; i++)
//         return `
//         <li class="caterory"><h2 class="category-title">${elem.list_name}</h2>
//         <ul class="category-top-books">
//         <a href=""><li><img src="${elem.books[0].book_image}" width='180px' height='256px' alt="${elem.books[0].title}"><h3>${elem.books[0].title}</h3><p>${elem.books[0].author}</p></li></a>
//         <a href=""><li><img src="${elem.books[1].book_image}" width='180px' height='256px' alt="${elem.books[1].title}"><h3>${elem.books[1].title}</h3><p>${elem.books[1].author}</p></li></a>
//         <a href=""><li><img src="${elem.books[2].book_image}" width='180px' height='256px' alt="${elem.books[2].title}"><h3>${elem.books[2].title}</h3><p>${elem.books[2].author}</p></li></a>
//         <a href=""><li><img src="${elem.books[3].book_image}" width='180px' height='256px' alt="${elem.books[3].title}"><h3>${elem.books[3].title}</h3><p>${elem.books[3].author}</p></li></a>
//         <a href=""><li><img src="${elem.books[4].book_image}" width='180px' height='256px' alt="${elem.books[4].title}"><h3>${elem.books[4].title}</h3><p>${elem.books[4].author}</p></li></a>
//         </ul>
//         <button data-filter="${elem.list_name}" class="list-name list-name-btn">see more</button>
//         </li>`;
//     })
//     .join(' ');
//   ulBooksList.innerHTML = dataMarkupAll;

//   const dataMarkupTitle = `
//     <h1>Best Sellers Books</h1>`;
//   divBooksList.innerHTML = dataMarkupTitle;
// }
