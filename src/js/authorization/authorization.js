const ESC_KEY_CODE = 'Escape';


const openModalButton = document.querySelector('[data-modal-open]');
const closeModalButton = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const autirizationFormEl = document.querySelector('.authorization_form');
const userNameEl = document.querySelector('#user_name');
const userEmailEl = document.querySelector('#user_email');
const userPasswordEl = document.querySelector('#user_password');
const autorizationButtonEl = document.querySelector('.authorization_button_submit');
const signUpLink = document.querySelector('[data-action="sign-up"]');
const signInLink = document.querySelector('[data-action="sign-in"]');
const autorizationBackdrop = document.querySelector('.authorization_backdrop');
const signInForm = document.querySelector('#sign-in');
const signUpForm = document.querySelector('#sign-up');
// const signUpMobileButton = document.querySelector('.signup-mobile-button');
      
openModalButton.addEventListener('click', openModal);
// signUpMobileButton.addEventListener('click', openModal);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

function openModal() {
  signUpForm.reset();
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  closeModalButton.addEventListener('click', closeModal);
  autorizationBackdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscapeKeydown);
}

function closeModal() {
  modal.classList.add('is-hidden');


//   mobMenuEl.classList.remove('is-open');
//   mobMenuButton.classList.remove('is-open');
  document.body.style.overflow = '';

  
  closeModalButton.removeEventListener('click', closeModal);
  autorizationBackdrop.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscapeKeydown);
}

function onEscapeKeydown(event) {
  if (event.key === ESC_KEY_CODE) {
    closeModal();
  }
}

signUpLink.disabled = true;

signInLink.addEventListener('click', event => {
  event.preventDefault();
  signUpLink.classList.remove('active-link');
  signUpLink.classList.add('desactive-link');
  signInLink.classList.remove('desactive-link');
  signInLink.classList.add('active-link');
  autorizationButtonEl.textContent = 'Sign in';

  signInForm.classList.remove('display-form');
  signUpForm.classList.add('display-form');

  signUpLink.disabled = false;
  signInLink.disabled = true;
});

signUpLink.addEventListener('click', event => {
  event.preventDefault();
  signUpLink.classList.add('active-link');
  signUpLink.classList.remove('desactive-link');
  signInLink.classList.add('desactive-link');
  signInLink.classList.remove('active-link');
  autorizationButtonEl.textContent = 'Sign Up';

  signInForm.classList.add('display-form');
  signUpForm.classList.remove('display-form');

  signUpLink.disabled = true;
  signInLink.disabled = false;
});


const buttonToTop  = document.querySelector('.button-to-top');

window.addEventListener('scroll', onScroll);
buttonToTop.addEventListener('click', onButtonToTop);

function onScroll() {
  const scrolled = window.pageYOffset;
  const size  = document.documentElement.clientHeight;

  if (scrolled > size) {
    buttonToTop .classList.add('button-to-top--visible');
  }
  if (scrolled < size) {
    buttonToTop .classList.remove('button-to-top--visible');
  }
}

function onButtonToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}