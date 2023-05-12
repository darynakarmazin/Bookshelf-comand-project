function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal-active');
}

window.onload = function () {
  const ulBooksList = document.querySelectorAll('.books-list');
  const ulBooksListTop = document.querySelectorAll('.books-list-top');

  ulBooksList.forEach(book => {
    book.addEventListener('click', event => {
      event.preventDefault();

      const modal = document.querySelector('.modal');
      const title = modal.querySelector('.book-title');
      const author = modal.querySelector('.book-author');
      const description = modal.querySelector('.book-description');

      const bookLink = event.target.closest('.books-list-img');
      if (!bookLink) return;
      const bookId = bookLink.dataset.id;
      if (!bookId) {
        console.error('data-id attribute not found on the book link');
        return;
      }

      modal.classList.add('modal-active');

      fetch(`https://books-backend.p.goit.global/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
          const book = data;
          console.log(book);
          if (book) {
            renderStats(book);
            updateButton(
              bookId,
              book.title,
              book.author,
              book.description,
              book.book_image
            );
          } else {
            console.error('The book object is empty.');
          }
        })
        .catch(error => console.error(error));
    });
  });

  ulBooksListTop.forEach(book => {
    book.addEventListener('click', event => {
      event.preventDefault();

      const modal = document.querySelector('.modal');
      const title = modal.querySelector('.book-title');
      const author = modal.querySelector('.book-author');
      const description = modal.querySelector('.book-description');

      const bookLink = event.target.closest('.books-list-img');
      if (!bookLink) return;
      const bookId = bookLink.dataset.id;
      if (!bookId) {
        console.error('data-id attribute not found on the book link');
        return;
      }

      modal.classList.add('modal-active');

      fetch(`https://books-backend.p.goit.global/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
          const book = data;
          console.log(book);
          if (book) {
            renderStats(book);
            updateButton(
              bookId,
              book.title,
              book.author,
              book.description,
              book.book_image
            );
          } else {
            console.error('The book object is empty.');
          }
        })
        .catch(error => console.error(error));
    });
  });
};

function renderStats(book) {
  let imgchop1 = new URL('/src/images/shop1.png', import.meta.url);
  let imgchop2 = new URL('/src/images/shop2.png', import.meta.url);
  let imgchop3 = new URL('/src/images/shop3.png', import.meta.url);
  const content = `
    <div class="book-cover-container">
      <img src="${book.book_image}" alt="${book.title}" class="book-cover">
    </div>
    <div class="modal-text">
      <p class="book-title">${book.title}</p>
      <p class="book-author">Author: ${book.author}</p>
      <p class="book-description">${book.description}</p>
      <ul class="box-shoppingList-shop">
        <li>
          <a
            class="shop-shoppingList-link"
            target="_blank"
            href="${book.buy_links[0].url}"
          >
            <img
              src="${imgchop1}"
              class="shop-shoppingList-img"
              alt="amazon"
              />
          </a>
              </li>
              <li>
          <a
              class="shop-shoppingList-link"
              target="_blank"
              href="${book.buy_links[1].url}"
              >
              <img
              class="shop-shoppingList-img2"
              src="${imgchop2}"
              alt="amazon"
              />
          </a>
        </li>
        <li>
          <a
              class="shop-shoppingList-link"
              target="_blank"
              href="${book.buy_links[2].url}"
              >
              <img
              class="shop-shoppingList-img2"
              src="${imgchop3}"
              alt="amazon"
              />
          </a>
        </li>
      </ul>
    </div>
    <button class="add-to-list-button">Add to Shopping List</button>

`;
const modalContent = document.querySelector('.modal-content');
modalContent.innerHTML = content;
}

function updateButton(
bookId,
bookTitle,
bookAuthor,
bookDescription,
bookImageUrl
) {
const button = document.querySelector('.add-to-list-button');
const bookList = getBookListFromLocalStorage();
const isBookInList = bookList.some(item => item.id === bookId);

if (isBookInList) {
button.textContent = 'Remove from Shopping List';
} else {
button.textContent = 'Add to Shopping List';
}

button.addEventListener('click', () => {
handleButtonClick(
bookId,
bookTitle,
bookAuthor,
bookDescription,
bookImageUrl
);
});
}

function handleButtonClick(
bookId,
bookTitle,
bookAuthor,
bookDescription,
bookImageUrl
) {
const button = document.querySelector('.add-to-list-button');
const bookList = getBookListFromLocalStorage();
const isBookInList = bookList.some(item => item.id === bookId);

if (isBookInList) {
removeFromLocalStorage(bookId);
button.textContent = 'Add to Shopping List';
} else {
addToLocalStorage(
bookId,
bookTitle,
bookAuthor,
bookDescription,
bookImageUrl
);
button.textContent = 'Remove from Shopping List';
}

updateShoppingListInfo();
}

function getBookListFromLocalStorage() {
const bookList = localStorage.getItem('bookList');
return bookList ? JSON.parse(bookList) : [];
}

function addToLocalStorage(
bookId,
bookTitle,
bookAuthor,
bookDescription,
bookImage,
bookImageURL
) {
const bookList = getBookListFromLocalStorage();
bookList.push({
id: bookId,
title: bookTitle,
author: bookAuthor,
description: bookDescription,
image: bookImage,
imageURL: bookImageURL,
});
localStorage.setItem('bookList', JSON.stringify(bookList));
}

function removeFromLocalStorage(bookId) {
const bookList = getBookListFromLocalStorage();
const updatedList = bookList.filter(item => item.id !== bookId);
localStorage.setItem('bookList', JSON.stringify(updatedList));
}

function updateShoppingListInfo() {
const bookList = getBookListFromLocalStorage();
const shoppingListInfo = document.querySelector('.shopping-list-info');
shoppingListInfo.textContent = `Shopping List (${bookList.length} books)`;
}

// Закриття модального вікна при натисканні на кнопку закриття
const closeButton = document.querySelector('.close-mob');
closeButton.addEventListener('click', () => {
  closeModal();
});

// Закриття модального вікна при натисканні за межами вікна
const modalBackground = document.querySelector('.modal');
modalBackground.addEventListener('click', event => {
  if (event.target === modalBackground) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal-active');
}