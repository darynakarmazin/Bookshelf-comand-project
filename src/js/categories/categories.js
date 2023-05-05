import { fetchCategories, fetchBooks } from './fetchBooks.js';

import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

const ulBooksList = document.querySelector('.books-list');
const titleBooksList = document.querySelector('.books-list-title');
const navList = document.querySelector('.categories-list');
const listEmpty = document.querySelector('.books-list-empty');

onRenderFiltred();

function onRenderFiltred() {
  fetchCategories().then(filtersMarkup).catch();
}

function filtersMarkup(filtersData) {
  const filtersMarkup = filtersData
    .map(filterData => {
      return `
      <li data-filter="${filterData.list_name}" class="categories-list-name">${filterData.list_name}</li>`;
    })
    .join(' ');
  navList.innerHTML = `
      <li data-filter="Best Sellers Books" class="categories-list-name">All categories</li>
      ${filtersMarkup}`;
}

navList.addEventListener('click', onFiltred);

function onFiltred(event) {
  event.preventDefault();
  if (event.target.tagName !== 'LI') return;

  let cateroryName = event.target.dataset['filter'];

  const dataMarkupTitle = `<h2>${cateroryName}</h2>`;
  titleBooksList.innerHTML = dataMarkupTitle;

  removeActiveClass();
  event.target.classList.add('acvite');

  if (cateroryName === 'Best Sellers Books') {
    console.log('place for Best Sellers Books function');
    ulBooksList.innerHTML = '';
    return;
  }

  fetchBooks(cateroryName).then(dataMarkup).catch();
}

function removeActiveClass() {
  const listNames = document.querySelectorAll('.categories-list-name');
  listNames.forEach(elem => {
    elem.classList.remove('acvite');
  });
}

function dataMarkup(booksData) {
  if (booksData.length === 0) {
    console.log('Немає інфо');

    const dataMarkup = `
    <p class="book-list-discription">This page is empty, add some books and proceed to order.</p>
    <img src="../images/empty-page.png" alt="Empty list image">
    `;
    ulBooksList.innerHTML = '';
    listEmpty.innerHTML = dataMarkup;

    return;
  }

  const dataMarkup = booksData
    .map(bookData => {
      return `
      <li>
        <a class="books-list-link" href="">
          <img class="books-list-img" src="${bookData.book_image}" alt="${bookData.title}">
          <div class="content">
            <h3 class="books-list-name">${bookData.title}</h3>
            <p class="books-list-text">${bookData.author}</p> 
          </div>
        </a>
      </li>`;
    })
    .join(' ');
  ulBooksList.innerHTML = dataMarkup;
}

new SimpleBar(document.getElementById('myElement'), {
  autoHide: false,
  scrollbarMinSize: 167
});
