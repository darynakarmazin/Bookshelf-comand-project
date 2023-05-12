import { array } from './support-ukraine-array';
import debounce from 'lodash.debounce';

const container = document.querySelector('#support-ukraine');
const loadMoreBtn = document.querySelector('button.button-support-ukraine');
let limit = 0;
let inc = 2;

window.addEventListener('resize', debounce(resize, 1000));

resize();
function resize() {
  (function () {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw < 768) {
      limit = 4;
    } else {
      limit = 6;
    }
  })();
  renderListSupport(array, limit);
}

function renderListSupport(array, limit) {
  clearContainer();
  const markup = array
    .map(({ title, url, img, img2 }, index) => {
      index += 1;
      if (index < limit + 1) {
        return `        
          <div class="logo-support-ukraine">
            0${index}<a
              href="${url}"
              title="${title}"
              target="_blank"
              rel="noopener noreferrer"
              ><img
                srcset="${img} 1x, ${img2} 2x"
                src="${img}"
                alt="${title}"
                height="32"
            /></a>
            </div>
  `;
      }
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', scrolList);

function scrolList() {
  clearContainer();
  if (limit === 6) {
    if (inc < limit - 1) {
      renderListScrol(array, limit, inc);
      inc += 1;
    } else {
      renderListSupport(array, limit);
      inc = 2;
      return;
    }
  } else if (inc < limit + 3) {
    renderListScrol(array, limit, inc);
    inc += 1;
  } else {
    renderListSupport(array, limit);
    inc = 2;
    return;
  }
}

function renderListScrol(array, limit, inc) {
  const markup = array
    .map(({ title, url, img, img2 }, index) => {
      index += 1;
      if (index >= inc && index < limit + inc) {
        return `        
          <div class="logo-support-ukraine">
            0${index}<a
              href="${url}"
              title="${title}"
              target="_blank"
              rel="noopener noreferrer"
              ><img
                srcset="${img} 1x, ${img2} 2x"
                src="${img}"
                alt="${title}"
                
            /></a>
            </div>
  `;
      }
    })
    .join('');
  container.innerHTML = markup;
}

function clearContainer() {
  container.innerHTML = '';
}
