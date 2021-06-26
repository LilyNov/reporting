const refs = {
  table: document.querySelector('[data-table]'),
  btnBackPage: document.querySelector('[data-btn-back]'),
  btnFirstPage: document.querySelector('[data-page-first]'),
  btnLastPage: document.querySelector('[data-page-last]'),
  btnToPage: document.querySelector('[data-btn-to]'),
  nav: document.querySelector('.nav'),
  iconMenu: document.querySelector('.menu__icon'),
  navLink: document.querySelectorAll('.nav__link'),
  loader: document.querySelector('.mask'),
};

refs.btnBackPage.addEventListener('click', OnBackPage);
refs.btnFirstPage.addEventListener('click', OnfirstPage);
refs.btnLastPage.addEventListener('click', OnLastPage);
refs.btnToPage.addEventListener('click', OnToPage);
refs.iconMenu.addEventListener('click', onBurgerMenu);

let strInTable = 8;
let step = 9;
let min = 0;
let max = min + strInTable;

window.addEventListener('load', renderTable);

function renderTable() {
  renderList(min, max);
}

async function renderList(min, max) {
  const BASE_URL =
    'https://gist.githubusercontent.com/LilyNov/4b2e78776268f66201c7452e7246f73c/raw/2486806b6c1c4efcbd89674699b098601dc78394/table.json';

  const response = await fetch(BASE_URL);
  const render = response.json();
  render.then(data => {
    for (let i = min; i <= max; i++) {
      const d = data[i];
      createList(d);
    }
  });
}

function createList(d) {
  const list = `<tr>
                  <td>${d['Task name']}</td>
                  <td>${d['Developer']}</td>
                  <td>${d['Work Type']}</td>
                  <td>${d['Status']}</td>
                  <td>${d['Estimation (h)']}</td>
                  <td>${d['Total time spent by All']}</td>
                  <td>${d['My Time spent by Period (h)']}</td>
                  <td>${d['Efficiency']}</td>
              </tr>`;
  refs.table.insertAdjacentHTML('beforeend', list);
}

// pagination

function OnfirstPage() {
  refs.btnLastPage.classList.remove('active');
  refs.btnFirstPage.classList.add('active');
  min = 0;
  max = min + strInTable;
  refs.loader.classList.add('hide');
  refs.table.style.opacity = 0;
  setTimeout(() => {
    refs.table.innerHTML = '';
    renderList(min, max);
    refs.loader.classList.remove('hide');
    refs.table.style.opacity = 1;
  }, 1200);
}

function OnLastPage() {
  refs.btnLastPage.classList.add('active');
  refs.btnFirstPage.classList.remove('active');
  min = min + step;
  max = min + strInTable;
  refs.loader.classList.add('hide');
  refs.table.style.opacity = 0;

  setTimeout(() => {
    refs.table.innerHTML = '';
    renderList(min, max);
    refs.loader.classList.remove('hide');
    refs.table.style.opacity = 1;
  }, 1200);
}

function OnBackPage() {
  OnfirstPage();
}

function OnToPage() {
  OnLastPage();
}

// burger menu

function onBurgerMenu() {
  document.body.classList.toggle('lock');
  refs.iconMenu.classList.toggle('active');
  refs.nav.classList.toggle('active');
  onMenu();
}

function onMenu() {
  refs.navLink.forEach(elem => {
    elem.addEventListener('click', () => onBurgerMenu());
  });
}
