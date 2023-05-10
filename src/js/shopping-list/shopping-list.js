window.addEventListener('load', loadBookSL);

let KEY_SL = 'parsedData';
// let imgEmpryBig = new URL('/src/images/empty-page@2.png', import.meta.url);
// let imgEmpry = new URL('/src/images/empty-page.png', import.meta.url);
// let imgIcon = new URL('/src/images/shopping-list-icon.svg', import.meta.url);
const ulMarkupSL = document.querySelector('.books-shoppingList');
// let limitSlp;
let limitSlp = 0;
let thisPageSlp = 1;
// -------------JSON------------------
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

function loadBookSL() {
  parsedData != null
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

function limitVW() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  console.log(vw);
  if (vw < 768) {
    console.log('vw1');
    limitSlp = 4;
    // markupBookContent(parsedData, limit);
  } else {
    console.log('vw2');
    limitSlp = 3;
    // markupBookContent(parsedData, limit);
  }
}
// --------------------------------------------------

// -----------------------------------------
function markupBookContent(parsedData) {
  ulMarkupSL.innerHTML = '';
  console.log('vw3');
  const markupBookLi = parsedData
    .map(parsedData => {
      // console.log("vw4");
      return `<li class="item books-shoppingListLi">
                <img
                  class="books-shoppingList-img"
                  src="${parsedData.book_image}"
                  alt="Book"
                />
                <div class="box-shoppingList-content">
                  <div id="cont" class="box-shoppingList">
                    <div>
                      <h2 class="text-shoppingList-title">${parsedData.title}</h2>
                      <p class="text-shoppingList-category">${parsedData.publisher}</p>
                    </div>
                    <button class="box-shoppingList-trash" id="${parsedData._id}">
                      <svg class="box-shoppingList-trash-icon">
                        <use
                          href="${imgIcon}#icon-trash"
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
    })
    .join('');
  // console.log("vw5");
  ulMarkupSL.innerHTML = markupBookLi;

  // deliteBookId()
  loadItem();

  console.log(888888);
}
// -----------------------------
function loadItem() {
  limitVW();

  let listSlp = document.querySelectorAll('.item');
  let beginGet = limitSlp * (thisPageSlp - 1);
  let endGet = limitSlp * thisPageSlp - 1;
  console.log('loadItem1');
  console.log(limitSlp);
  console.log('loadItem1');
  console.log(beginGet);
  console.log(endGet);
  listSlp.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.classList.add('item');
      // console.log("loadItem2");
    } else {
      item.classList.add('itemNone');
    }
  });
  console.log('loadEnd');

  listPage();
}

function listPage() {
  console.log('ctartbtn');
  console.log(limitSlp);
  // console.log("ctartbtn")

  let count = Math.ceil(document.querySelectorAll('.item').length / limitSlp);
  console.log(cont);
  document.querySelector('.books-shoppingList-listPage').innerHTML = '';
  console.log('marcuo000');
  console.log(thisPageSlp);

  if (thisPageSlp != 1) {
    let prev = document.createElement('li');
    prev.innerText = 'Prev';
    prev.setAttribute('onclick', 'changePage(' + (thisPageSlp - 1) + ')');
    document.querySelector('.books-shoppingList-listPage').appendChild(prev);
  }

  for (i = 1; i <= count; i++) {
    let newPageSlp = document.createElement('li');
    newPageSlp.innerText = i;
    if (i == thisPageSlp) {
      newPageSlp.classList.add('activeSlp');
    }
    newPageSlp.setAttribute('onclick', 'changePage(' + i + ')');
    document
      .querySelector('.books-shoppingList-listPage')
      .appendChild(newPageSlp);
  }

  if (thisPageSlp != count) {
    let next = document.createElement('li');
    next.innerText = 'Next';
    next.setAttribute('onclick', 'changePage(' + (thisPageSlp + 1) + ')');
    document.querySelector('.books-shoppingList-listPage').appendChild(next);
  }
}

function changePage(i) {
  thisPageSlp = i;
  loadItem();
}
// -----------------------------------
function deliteBookId() {
  console.log('n1');
  var dots = document.getElementsByClassName('box-shoppingList-trash');

  var i,
    length = dots.length;
  console.log('n2');

  for (i = 0; i < length; i++) {
    dots[i].addEventListener('click', e => {
      keyId = e.target.parentElement.attributes.id.value;
      console.log(keyId);
      let filtered = parsedData.filter(o => o._id !== keyId);

      console.log(filtered);
      localStorage.setItem(KEY_SL, JSON.stringify(filtered));
      loadData = localStorage.getItem(KEY_SL);
      parsedData = JSON.parse(loadData);
      loadBookSL();
    });
    console.log('nnnn3');
  }
}
