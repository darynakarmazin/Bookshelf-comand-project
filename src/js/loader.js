let mask = document.querySelector('.mask');

window.addEventListener('load', offLoader);

export function offLoader() {
  mask.classList.add('hide');
}

 export function onLoader() {
  mask.classList.add('visible');
}
