const refs = {
  openBurgerBtn: document.querySelector('.burger-menu'),
  closeBurgerBtn: document.querySelector('.mobile-menu__button'),
  burger: document.querySelector('.mobile-menu-container'),
};

refs.openBurgerBtn.addEventListener('click', toggleModal);
refs.closeBurgerBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.burger.classList.toggle('is-hidden');
}
