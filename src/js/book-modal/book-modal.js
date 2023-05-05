const openModalBtn = document.querySelector("[data-modal-open]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");

openModalBtn.addEventListener("click", () => {
modal.classList.toggle("is-hidden");
});

closeModalBtn.addEventListener("click", () => {
modal.classList.toggle("is-hidden");
});