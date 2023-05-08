window.addEventListener('load', loadBookSL);

const KEY_SL = '111111';
let imgEmpryBig = new URL('/src/images/empty-page@2.png', import.meta.url);
let imgEmpry = new URL('/src/images/empty-page.png', import.meta.url);
const ulMarkupSL = document.querySelector('.marcup-shoppingList');

// -------------JSON------------------
function loadBookSL() {
  const loadData = localStorage.getItem(KEY_SL);
  //   console.log(loadData);
  if (loadData) {
    // const parsedSettings = JSON.parse(savedSettings);
  }
  ulMarkupSL.innerHTML = markupBookZoro;
}

const markupBookZoro = `<p class="shoppingList-text">
            This page is empty, add some books and proceed to order.
          </p>
          <a href="./index.html">
            <picture>
              <source srcset="${imgEmpryBig} 2x" type="image/png" />
              <img
                class="shoppingList-img"
                src="${imgEmpry}"
                alt="Book"
              />
            </picture>
          </a>`;
