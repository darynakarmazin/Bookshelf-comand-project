window.addEventListener('load', loadBookSL);

const KEY_SL = 'bookList';
let imgEmpryBig = new URL('/src/images/empty-page@2.png', import.meta.url);
let imgEmpry = new URL('/src/images/empty-page.png', import.meta.url);
let imgchop1 = new URL('/src/images/shop1.png', import.meta.url);
let imgchop2 = new URL('/src/images/shop2.png', import.meta.url);
let imgchop3 = new URL('/src/images/shop3.png', import.meta.url);
let imgIcon = new URL('/src/images/trash-03.png', import.meta.url);

const ulMarkupSL = document.querySelector('.books-shoppingList');
// const parsedData = [
//   {
//     _id: '1',
//     book_image: '1',
//     title: 'Назва1',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '2',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва2',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '3',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва3',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '4',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва4',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '5',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва5',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '6',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва6',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '7',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва7',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
//   {
//     _id: '8',
//     book_image: new URL('/src/images/empty-page.png', import.meta.url),
//     title: 'Назва8',
//     publisher: 'група',
//     description: 'опис',
//     author: 'автор',
//   },
// ];
// localStorage.setItem('parsedData', JSON.stringify(parsedData));
// --------------------
let loadData = localStorage.getItem(KEY_SL);
let parsedData = JSON.parse(loadData);

// ---------------------екран------------------
// (function limitVW() {
//   const vw = Math.max(
//     document.documentElement.clientWidth || 0,
//     window.innerWidth || 0
//   );
//   if (vw < 768) {
//     limitSlp = 4;
//     return limitSlp;
//   } else {
//     limitSlp = 3;
//     return limitSlp;
//   }
// })();
// ----------------------------
function loadBookSL() {
  loadData != null
    ? markupBookContent(parsedData)
    : (ulMarkupSL.innerHTML = markupBookZoro);
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

function markupBookContent(parsedData) {
  ulMarkupSL.innerHTML = '';
  const markupBookLi = parsedData
    .map((parsedData, i) => {
      i += 1;
      if (i < parsedData.length + 1) {
        return `<li class="books-shoppingListLi">
                <img
                  class="books-shoppingList-img"
                  src="${parsedData.book_image}"
                  alt=""
                />
                <div class="box-shoppingList-content">
                  <div id="cont" class="box-shoppingList">
                    <div>
                      <h2 class="text-shoppingList-title">${parsedData.title}</h2>
                      <p class="text-shoppingList-category">${parsedData.publisher}</p>
                    </div>
                    <button class="box-shoppingList-trash" id="${parsedData._id}">
                       <img
                            class="box-shoppingList-trash-icon"
                            src="${imgIcon}"
                            alt="trash"

                            />       
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
                           <img
                            class="shop-shoppingList-img1"
                            src="${imgchop1}"
                            alt="amazon"

                            />       
                        </a>
                      </li>
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          href="https://goto.applebooks.apple"
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
                          href="https://du-gae-books-dot-nyt-du-prd.appspot.com"
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
                </div>
              </li>
            `;
      }
    })
    .join('');
  ulMarkupSL.innerHTML = markupBookLi;

  deliteBookId();
}

function deliteBookId() {
  let dots = document.getElementsByClassName('box-shoppingList-trash');
  let i;

  for (i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', e => {
      keyId = e.target.parentElement.attributes.id.value;
      let filtered = parsedData.filter(o => o._id !== keyId);

      localStorage.setItem(KEY_SL, JSON.stringify(filtered));
      loadData = localStorage.getItem(KEY_SL);
      parsedData = JSON.parse(loadData);
      loadBookSL();
    });
  }
}
