import { fetchTopBooks } from './fetchTopBooks';
import { onFiltred } from '../categories/categories';
import { offLoader, onLoader } from '../loader.js';

const ulBooksListTop = document.querySelector('.books-list-top');
const ulBooksList = document.querySelector('.books-list');
const divBooksList = document.querySelector('.books-list-title');

onRenderBestsellers();
export function onRenderBestsellers() {
  onLoader();
  fetchTopBooks().then(dataBestsellers).catch();
}

function dataBestsellers(data) {
  ulBooksList.innerHTML = '';
  const dataBestsellers = data
    .map(elem => {
      return `
  <li class="caterory"><h2 class="category-title">${elem.list_name}</h2>
    <ul class="category-top-books">
      <li>
        <a class="books-list-link" href="">
        <div class="thumb">
          <img class="books-list-img" data-id="${elem.books[0]._id}" src="${elem.books[0].book_image}" alt="${elem.books[0].title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
          <div class="content">
            <h3 class="books-list-name">${elem.books[0].title}</h3>
            <p class="books-list-text">${elem.books[0].author}</p> 
          </div>
        </a>
      </li>
      <li>
        <a class="books-list-link" href="">
        <div class="thumb">
          <img class="books-list-img" src="${elem.books[1].book_image}" alt="${elem.books[1].title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
          <div class="content">
            <h3 class="books-list-name">${elem.books[1].title}</h3>
            <p class="books-list-text">${elem.books[1].author}</p> 
          </div>
        </a>
      </li>
      <li>
        <a class="books-list-link" href="">
        <div class="thumb">
          <img class="books-list-img" src="${elem.books[2].book_image}" alt="${elem.books[2].title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
          <div class="content">
            <h3 class="books-list-name">${elem.books[2].title}</h3>
            <p class="books-list-text">${elem.books[2].author}</p> 
          </div>
        </a>
      </li>
      <li>
        <a class="books-list-link" href="">
        <div class="thumb">
          <img class="books-list-img" src="${elem.books[3].book_image}" alt="${elem.books[3].title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
          <div class="content">
            <h3 class="books-list-name">${elem.books[3].title}</h3>
            <p class="books-list-text">${elem.books[3].author}</p> 
          </div>
        </a>
      </li>
            <li>
        <a class="books-list-link" href="">
        <div class="thumb">
          <img class="books-list-img" src="${elem.books[4].book_image}" alt="${elem.books[4].title}">
          <div class="actions-card">
            <p class="discription">quick view</p>
          </div>
        </div>
          <div class="content">
            <h3 class="books-list-name">${elem.books[4].title}</h3>
            <p class="books-list-text">${elem.books[4].author}</p> 
          </div>
        </a>
      </li>
      </ul>
        <button data-filter="${elem.list_name}" class="list-name best-sellers-btn">see more</button>
        </li>`;
    })
    .join(' ');
  ulBooksListTop.innerHTML = dataBestsellers;

  const dataMarkupTitle = `<h2>Best Sellers <span>Books</span></h2>`;
  divBooksList.innerHTML = dataMarkupTitle;

  onCategorriesBtn();
  offLoader();
}

function onCategorriesBtn() {
  const categorriesBtn = document.querySelectorAll('.best-sellers-btn');
  categorriesBtn.forEach(element =>
    element.addEventListener('click', onFiltred)
  );
}
