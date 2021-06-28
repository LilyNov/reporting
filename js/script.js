const refs = {
  tableContainer: document.querySelector('#table'),
  tableHeadPc: document.querySelector('[id="thead-pc"]'),
  tableBody: document.querySelector('[data-table]'),
  btnBackPage: document.querySelector('[data-btn-back]'),
  btnFirstPage: document.querySelector('[data-page-first]'),
  btnLastPage: document.querySelector('[data-page-last]'),
  btnToPage: document.querySelector('[data-btn-to]'),
  nav: document.querySelector('.nav'),
  iconMenu: document.querySelector('.menu__icon'),
  navLink: document.querySelectorAll('.nav__link'),
};

refs.btnBackPage.addEventListener('click', OnBackPage);
refs.btnFirstPage.addEventListener('click', OnfirstPage);
refs.btnLastPage.addEventListener('click', OnLastPage);
refs.btnToPage.addEventListener('click', OnToPage);
refs.iconMenu.addEventListener('click', onBurgerMenu);
refs.tableContainer.addEventListener('click', tableSort);

let strInTable = 8;
let step = 9;
let min = 0;
let max = min + strInTable;
const loaderMarkup = `<div class="mask">
                    <div class="loader"></div>
                </div>`;

window.addEventListener('load', renderTable);
window.addEventListener(
  `resize`,
  () => {
    if (window.innerWidth < 767) {
      document.location.reload();
    } else if (window.innerWidth >= 767) {
      document.location.reload();
    }
  },
  false,
);

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
      if (window.innerWidth < 767) {
        createTabelMobile(d);
      } else {
        createList(d);
      }
    }
  });
}

function createTabelMobile(d) {
  const list = `
  <table id="table-mob" >
    <tr class="table-box__title">
      <th>Task name</th>
      <th>Developer</th>
      <th>Work Type</th>
      <th>Status</th>
      <th data-type="number">Estimation (h)</th>
      <th  data-type="number">Total time spent by All</th>
      <th data-type="number">My Time spent by Period (h)</th>
      <th data-type="text">Efficiency</th>
    </tr>
    <tr class="table-box__body">
      <td>${d['Task name']}</td>
      <td>${d['Developer']}</td>
      <td>${d['Work Type']}</td>
      <td class='${d['Status'].toLowerCase().slice(0, 3)}' id='status'>${
    d['Status']
  }
      </td>
      <td>${d['Estimation (h)']}</td>
      <td>${d['Total time spent by All']}</td>
      <td>${d['My Time spent by Period (h)']}</td>
      <td>${d['Efficiency']}</td>
    </tr>
  </table>
`;

  refs.tableBody.insertAdjacentHTML('beforebegin', list);
}

function createList(d) {
  const list = `<tr>
                  <td>${d['Task name']}</td>
                  <td>${d['Developer']}</td>
                  <td>${d['Work Type']}</td>
                  <td class='${d['Status']
                    .toLowerCase()
                    .slice(0, 3)}' id='status'>${d['Status']}</td>
                  <td>${d['Estimation (h)']}</td>
                  <td>${d['Total time spent by All']}</td>
                  <td>${d['My Time spent by Period (h)']}</td>
                  <td>${d['Efficiency']}</td>
              </tr>
              
`;
  refs.tableBody.insertAdjacentHTML('beforeend', list);
}

// pagination

function OnfirstPage() {
  refs.tableContainer.insertAdjacentHTML('beforebegin', loaderMarkup);
  const loader = document.querySelector('.mask');

  refs.btnLastPage.classList.remove('active');
  refs.btnFirstPage.classList.add('active');
  min = 0;
  max = min + strInTable;

  refs.tableBody.style.opacity = 0;
  setTimeout(() => {
    refs.tableBody.innerHTML = '';
    renderList(min, max);
    loader.remove();
    refs.tableBody.style.opacity = 1;
  }, 1200);
}

function OnLastPage() {
  refs.tableContainer.insertAdjacentHTML('beforebegin', loaderMarkup);
  const loader = document.querySelector('.mask');

  refs.btnLastPage.classList.add('active');
  refs.btnFirstPage.classList.remove('active');
  min = min + step;
  max = min + strInTable;

  refs.tableBody.style.opacity = 0;

  setTimeout(() => {
    refs.tableBody.innerHTML = '';
    renderList(min, max);
    loader.remove();
    refs.tableBody.style.opacity = 1;
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

// sort
let total = 0;
let arr = [];
const sortFunc = (index, type) => {
  if (index === 0 || index === 1 || index === 2 || index === 3) return;

  const compare = (rowA, rowB) => {
    let dataRowsA = rowA.cells[index].innerHTML;
    let dataRowsB = rowB.cells[index].innerHTML;
    return dataRowsA > dataRowsB ? 1 : -1;
  };

  let rows = [].slice.call(refs.tableBody.rows);
  rows.sort(compare);

  refs.tableContainer.removeChild(refs.tableBody);

  for (let i = 0; i < rows.length; i++) {
    refs.tableBody.appendChild(rows[i]);
  }

  refs.tableContainer.appendChild(refs.tableBody);
};

function tableSort(e) {
  const elem = e.target;

  if (elem.nodeName !== 'TH') return;
  const index = elem.cellIndex;
  const type = elem.getAttribute('data-type');

  sortFunc(index, type);
}
