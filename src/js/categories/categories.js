import { fetchCategories, fetchBooks } from './fetchBooks.js';
import { onRenderBestsellers } from '../best-sellers/best-sellers.js';

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
      <li data-filter="Best Sellers Books" class="categories-list-name active">All categories</li>
      ${filtersMarkup}`;
}

navList.addEventListener('click', onFiltred);

export function onFiltred(event) {
  event.preventDefault();
  if (event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON')
    return;

  let cateroryName = event.target.dataset['filter'];
  let cateroryNamePart = cateroryName.split(' ').slice(0, -1).join(' ');
  let lastWord = cateroryName.split(' ').pop();

  const dataMarkupTitle = `<h2>${cateroryNamePart} <span>${lastWord}</span></h2>`;
  titleBooksList.innerHTML = dataMarkupTitle;

  removeActiveClass();
  event.target.classList.add('active');

  if (cateroryName === 'Best Sellers Books') {
    onRenderBestsellers();
    return;
  }

  fetchBooks(cateroryName).then(dataMarkup).catch();
}

function removeActiveClass() {
  const listNames = document.querySelectorAll('.categories-list-name');
  listNames.forEach(elem => {
    elem.classList.remove('active');
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
        <div class="thumb">
          <img class="books-list-img" src="${bookData.book_image}" alt="${bookData.title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
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
  scrollbarMinSize: 167,
});
