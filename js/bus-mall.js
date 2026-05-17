'use strict';

const MAX_CLICKS = 25;

let allProductsArr = [];
let votesCast = 0;

let productContainer = document.getElementById('products');
let imageEls = [
  document.getElementById('imgOne'),
  document.getElementById('imgTwo'),
  document.getElementById('imgThree'),
];
let nameEls = [
  document.getElementById('nameOne'),
  document.getElementById('nameTwo'),
  document.getElementById('nameThree'),
];
let voteUI       = document.getElementById('vote-ui');
let votesRemainingEl = document.getElementById('votes-remaining');
let progressFill = document.getElementById('progress-fill');
let progressTrack = document.getElementById('progress-track');
let chartContainer = document.getElementById('chart-container');

let ctx = document.getElementById('myChart').getContext('2d');

let uniqueImageCount = 6;

// ── PRODUCT CLASS ───────────────────────────────

class Product {
  constructor(name, fileExtension = 'jpg') {
    this.name = name;
    this.views = 0;
    this.votes = 0;
    this.photo = `img/${name}.${fileExtension}`;
    allProductsArr.push(this);
  }
}

// ── INITIALISE FROM STORAGE ─────────────────────

let retrievedProducts = localStorage.getItem('products');

if (retrievedProducts) {
  allProductsArr = JSON.parse(retrievedProducts);
} else {
  new Product('bag');
  new Product('banana');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

// ── HELPERS ─────────────────────────────────────

function randNum() {
  return Math.floor(Math.random() * allProductsArr.length);
}

function formatName(name) {
  return name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(allProductsArr));
}

function updateProgress() {
  let pct = (votesCast / MAX_CLICKS) * 100;
  progressFill.style.width = pct + '%';
  progressTrack.setAttribute('aria-valuenow', votesCast);

  votesRemainingEl.textContent = MAX_CLICKS - votesCast;
  votesRemainingEl.className =
    votesCast >= MAX_CLICKS - 3 ? 'final' :
    votesCast >= MAX_CLICKS / 2 ? 'low' : '';
}

// ── RENDERING ───────────────────────────────────

let indexArr = [];

function renderProducts() {
  while (indexArr.length < uniqueImageCount) {
    let randoNum = randNum();
    if (!indexArr.includes(randoNum)) indexArr.push(randoNum);
  }

  imageEls.forEach(function(imgEl, i) {
    let idx = indexArr.shift();
    let product = allProductsArr[idx];
    imgEl.src = product.photo;
    imgEl.alt = product.name;
    nameEls[i].textContent = formatName(product.name);
    product.views++;
  });
}

renderProducts();

// ── CHART ───────────────────────────────────────

function makeChartColors(count, alpha) {
  let colors = [];
  for (let i = 0; i < count; i++) {
    let hue = Math.round((i / count) * 360);
    colors.push(`hsla(${hue}, 70%, 55%, ${alpha})`);
  }
  return colors;
}

function renderChart() {
  let count = allProductsArr.length;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allProductsArr.map(p => formatName(p.name)),
      datasets: [{
        label: 'Votes',
        data: allProductsArr.map(p => p.votes),
        backgroundColor: makeChartColors(count, 0.75),
        borderColor: makeChartColors(count, 1),
        borderWidth: 1,
        borderRadius: 4,
      }, {
        label: 'Views',
        data: allProductsArr.map(p => p.views),
        backgroundColor: makeChartColors(count, 0.25),
        borderColor: makeChartColors(count, 0.7),
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { font: { family: 'Poppins', size: 12 } }
        }
      },
      scales: {
        x: { ticks: { font: { family: 'Poppins', size: 11 } } },
        y: { ticks: { font: { family: 'Poppins', size: 11 } } }
      }
    },
  });
}

// ── EVENT HANDLERS ──────────────────────────────

function handleClick(event) {
  let btn = event.target.closest('.product-btn');
  if (!btn) return;

  votesCast++;
  updateProgress();

  let imgClicked = btn.querySelector('img').alt;
  for (let i = 0; i < allProductsArr.length; i++) {
    if (imgClicked === allProductsArr[i].name) {
      allProductsArr[i].votes++;
      allProductsArr[i].views++;
    }
  }

  saveProducts();

  if (votesCast === MAX_CLICKS) {
    handleShowResults();
  } else {
    renderProducts();
  }
}

function handleShowResults() {
  productContainer.removeEventListener('click', handleClick);
  productContainer.hidden = true;
  voteUI.hidden = true;
  chartContainer.hidden = false;
  renderChart();
}

// ── INIT ─────────────────────────────────────────

productContainer.addEventListener('click', handleClick);
saveProducts();
