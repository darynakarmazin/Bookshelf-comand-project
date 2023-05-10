window.onload = function() {
  const ulBooksList = document.querySelectorAll('.books-list');

  ulBooksList.forEach(book => {
    book.addEventListener('click', (event) => {
      event.preventDefault();

      // Знайдіть модальне вікно та елементи з інформацією про книгу
      const modal = document.querySelector('.modal');
      const title = modal.querySelector('.book-title');
      const author = modal.querySelector('.book-author');
      const description = modal.querySelector('.book-description');

      const bookLink = event.target.closest('.books-list-img');
      // console.log(bookLink);
      if (!bookLink) return;
      const bookId = bookLink.dataset.id;
      // console.log(bookId);

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
    } else {
      console.error('The book object is empty.');
    }
  })
  
  .catch(error => console.error(error));

    });
  });


  // Закриття модального вікна при натисканні на кнопку закриття або за межами вікна
  const modal = document.querySelector('[data-modal]');
  const closeButton = document.querySelector('[data-modal-close]');
  const modalBackground = document.querySelector('.modal');

  closeButton.addEventListener('click', (event) => {
    if (event.target === closeButton) {
      closeModal();
    }
  });

  modalBackground.addEventListener('click', () => {
    closeModal();
  });

  function closeModal() {
    modalBackground.classList.remove('modal-active');
  }
}

function renderStats(book) {
  const content = `
    <div class="book-cover-container">
      <img src="${book.book_image}" alt="${book.title}" class="book-cover">
    </div>
    <div class="modal-text">
      <p class="book-title">${book.title}</p>
      <p class="book-author">Author: ${book.author}</p>
      <p class="book-description">${book.description}</p>
      <ul class="svg-list">
        ${book.buy_links.slice(0,3).map(link => `
        <li>
          <a href="${link.url}">
            ${link.name}
          </a>
        </li>`)
          .join('')}
      </ul>
    </div>
  `;
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = content;
}

//`https://books-backend.p.goit.global/books/${bookId}`