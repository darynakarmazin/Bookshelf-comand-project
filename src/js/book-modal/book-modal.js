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
        if (!bookLink) return;
        const bookId = bookLink.dataset.id;
  
        modal.classList.add('modal-active');
  
        fetch(`https://books-backend.p.goit.global/books/${bookId}`)
          .then(response => response.json())
          .then(data => {
            title.textContent = data.title;
            author.textContent = data.author;
            description.textContent = data.description;
          })
          .catch(error => console.error(error));
      });
    });
  
    // Закриття модального вікна при натисканні на кнопку закриття або за межами вікна
    const modal = document.querySelector('[data-modal]');
    const closeButton = document.querySelector('[data-modal-close]');
    const modalBackground = document.querySelector('.modal');
  
    modalBackground.addEventListener('click', (event) => {
      if (event.target === modalBackground) {
        closeModal();
      }
    });
  
    closeButton.addEventListener('click', () => {
      closeModal();
    });
  
    function closeModal() {
      modalBackground.classList.remove('modal-active');
    }
  }
  