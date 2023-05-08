window.addEventListener('load', loadBookSL);

const KEY_SL = '111111';
let imgEmpryBig = new URL('/src/images/empty-page@2.png', import.meta.url);
let imgEmpry = new URL('/src/images/empty-page.png', import.meta.url);
let imgIcon = new URL('/src/images/shopping-list-icon.svg', import.meta.url);
const ulMarkupSL = document.querySelector('.books-shoppingList');

// -------------JSON------------------
function loadBookSL() {
  const loadData = localStorage.getItem(KEY_SL);
  if (loadData) {
    // const parsedData = JSON.parse(loadData);
    markupBookContentVW();
  }
  ulMarkupSL.innerHTML = markupBookZoro;
}

const markupBookZoro = `<li><p class="shoppingList-text">
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
          </a></li>`;

function markupBookContentVW() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  console.log(vw);
  if (vw < 768) {
    limit = 4;
    markupBookContent(parsedData, limit);
  } else {
    limit = 3;
    markupBookContent(parsedData, limit);
  }
}

function markupBookContent(parsedData, limit) {
  ulMarkupSL.innerHTML = '';
  const markupBookLi = parsedData
    .map((parsedData, i) => {
      i += 1;
      if (i < limit + 1) {
        return `<li class="books-shoppingListLi">
                <img
                  class="books-shoppingList-img"
                  src="${parsedData.book_image}"
                  alt="Book"
                />
                <div class="box-shoppingList-content">
                  <div class="box-shoppingList">
                    <div>
                      <h2 class="text-shoppingList-title">${parsedData.title}</h2>
                      <p class="text-shoppingList-category">${parsedData.title}</p>
                    </div>
                    <button class="box-shoppingList-trash">
                      <svg class="box-shoppingList-trash-icon">
                        <use
                          href="${imgIcon}icon-trash"
                        ></use>
                      </svg>
                    </button>
                  </div>
                  <p class="text-shoppingList-content">
                    ${parsedData.description}
                  </p>
                  <div class="box-shoppingList-link">
                    <p class="text-shoppingList-author">${parsedData.author}</p>
                    <ul class="box-shoppingList-shop">
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          href="https://www.amazon.com"
                        >
                          <svg class="shop-shoppingList-img1">
                            <use
                              href="${imgIcon}#icon-shop1"
                            ></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          href="https://www.google.com/"
                        >
                          <svg class="shop-shoppingList-img2">
                            <use
                              href="${imgIcon}#icon-shop2"
                            ></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          href="https://www.google.com/"
                        >
                          <svg class="shop-shoppingList-img2">
                            <use
                              href="${imgIcon}#icon-shop3"
                            ></use>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            `;
      }
    })
    .join('');
  ulMarkupSL.innerHTML = markupBookLi;
}
