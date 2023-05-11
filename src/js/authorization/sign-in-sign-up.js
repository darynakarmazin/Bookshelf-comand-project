import { app } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import Notiflix from 'notiflix';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const openModalMobileButton = document.querySelector('.sign-up-button-burger');
const openModalUserButton = document.querySelector('.sign-up-button');
const autorizationBackdrop = document.querySelector('.authorization_backdrop');
const signInForm = document.querySelector('#sign-in');
const signUpForm = document.querySelector('#sign-up');
const logOutButton = document.querySelector('.log-out-button');
const mobileMenu = document.querySelector('.burger-container');
const mobileMenuButton = document.querySelector('.burger-menu');
const navigationHeader = document.querySelector('.navigation');
const logOutButtonUser = document.querySelector('.js-log-out-button');
const userBar = document.querySelector('.js-user-bar');
const userMobileAccount = document.querySelector('.js-user-container');
const burgerNavigation = document.querySelector('.navigation-burger');
const userName = document.querySelector('.user-bar-button-text');
const userNameMobile = document.querySelector('.js-user-mobile-name');
const loginedUserButton = document.querySelector('.js-user-bar-button');

loginedUserButton.addEventListener('click', function () {
  userBar.classList.add('is-active');
});

signUpForm.addEventListener('submit', registretedUser);
signInForm.addEventListener('submit', signInUser);
logOutButton.addEventListener('click', logOutUserAccount);
logOutButtonUser.addEventListener('click', logOutUserAccount);

function registretedUser(event) {
  event.preventDefault();

  // hide mobile menu
  mobileMenu.classList.remove('is-open');
  mobileMenuButton.classList.remove('is-open');
  document.body.style.overflow = '';

  const {
    elements: { name, email, password },
  } = event.currentTarget;

  validatePassword(password.value);
  let userEmail = email.value;
  let userPassword = password.value;
  let userName = name.value;
  if (createUser(auth, userEmail, userPassword, userName)) {
    setTimeout(() => {
      event.target.reset();
    }, 4000);
  }
}

function signInUser(event) {
  event.preventDefault();

  // hide mobile menu
  mobileMenu.classList.remove('is-open');
  mobileMenuButton.classList.remove('is-open');
  document.body.style.overflow = '';

  const {
    elements: { email, password },
  } = event.currentTarget;

  let userEmail = email.value;
  let userPassword = password.value;

  if (signInUserAccount(auth, userEmail, userPassword)) {
    setTimeout(() => {
      event.target.reset();
    }, 4000);
  }
}

// новий користувач
function createUser(auth, userEmail, userPassword, userName) {
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(cred => {
      let userId = cred.user.uid;

      writeUserData(userId, userName, userEmail);

      Notiflix.Notify.success(
        `Hello, ${userName}! Your registration has been completed successfully`
      );
      autorizationBackdrop.style.display = 'none';
      autorizationBackdrop.classList.add('is-hidden');
      navigationHeader.classList.remove('visually-hidden');
      userBar.classList.remove('visually-hidden');
      userMobileAccount.classList.remove('display-none');
      burgerNavigation.classList.remove('display-none');
      logOutButton.classList.remove('display-none');
      openModalMobileButton.classList.add('visually-hidden');
      openModalUserButton.classList.add('visually-hidden');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Notiflix.Notify.failure(
          'A user with this email address is already registered'
        );
      }
    });
}

const writeUserData = (userId, userName, userEmail) => {
  set(ref(db, 'users/' + userId), {
    username: userName,
    email: userEmail,
  }).catch(error => {});
};

// вхід зареєстрованого користувача
function signInUserAccount(auth, userEmail, userPassword) {
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then(() => {
      autorizationBackdrop.style.display = 'none';
      autorizationBackdrop.classList.add('is-hidden');
      navigationHeader.classList.remove('visually-hidden');
      userBar.classList.remove('visually-hidden');
      userMobileAccount.classList.remove('display-none');
      burgerNavigation.classList.remove('display-none');
      logOutButton.classList.remove('display-none');
      openModalMobileButton.classList.add('visually-hidden');
      openModalUserButton.classList.add('visually-hidden');
    })
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        Notiflix.Notify.failure('Your password is wrong, please try again');
      } else if (error.code === 'auth/user-not-found') {
        Notiflix.Notify.failure('Your email is wrong, please try again');
      }
    });
}

// активність користувача
function checkUserAuth() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userNameRef = ref(db, 'users/' + user.uid);
      onValue(userNameRef, name => {
        const currentUserName = name.exportVal();

        userName.innerHTML = currentUserName.username;
        userNameMobile.innerHTML = currentUserName.username;
      });

      navigationHeader.classList.remove('visually-hidden');
      userBar.classList.remove('visually-hidden');
      openModalUserButton.classList.add('visually-hidden');
      userMobileAccount.classList.remove('display-none');
      burgerNavigation.classList.remove('display-none');
      logOutButton.classList.remove('display-none');
      openModalMobileButton.classList.add('display-none');

      localStorage.setItem('user', 'true');
    }
  });
}

checkUserAuth();

function logOutUserAccount() {
  signOut(auth)
    .then(() => {
      navigationHeader.classList.add('visually-hidden'),
        userBar.classList.add('visually-hidden'),
        openModalUserButton.classList.remove('visually-hidden');
      userMobileAccount.classList.add('display-none'),
        burgerNavigation.classList.add('display-none'),
        logOutButton.classList.add('display-none'),
        openModalMobileButton.classList.remove('visually-hidden');
      userName.innerHTML = '';
      userNameMobile.innerHTML = '';

      localStorage.removeItem('user');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function validatePassword(password) {
  if (password.length < 5) {
    Notiflix.Notify.failure('Password should be at least 5 characters');
    return;
  }
}
