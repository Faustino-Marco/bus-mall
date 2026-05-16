'use strict';

let allProductsArr = [];

let productContainer = document.getElementById('products');
let imageEls = [
  document.getElementById('imgOne'),
  document.getElementById('imgTwo'),
  document.getElementById('imgThree'),
];
let instructions = document.getElementById('instructions');
let votesRemaining = document.getElementById('votes-remaining');
let chartContainer = document.getElementById('chart-container');

let ctx = document.getElementById('myChart').getContext('2d');

let maxClicksAllowed = 25;
let uniqueImageCount = 6;
class Product {
  constructor(name, fileExtension = 'jpg') {
    this.name = name;
    this.views = 0;
    this.votes = 0;
    this.photo = `img/${name}.${fileExtension}`;
    allProductsArr.push(this);
  }
}

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

//****************************************
//            HELPER FUNCTIONS
//****************************************

// RANDOM # GENERATOR
function randNum() {
  return Math.floor(Math.random() * allProductsArr.length);
}

// IMAGE RENDERING ALGORITHM

let indexArr = [];


function renderProducts() {
  while (indexArr.length < uniqueImageCount) {
    let randoNum = randNum();
    if (!indexArr.includes(randoNum)) {
      indexArr.push(randoNum);
    }
  }

  imageEls.forEach(function(imgEl) {
    let idx = indexArr.shift();
    imgEl.src = allProductsArr[idx].photo;
    imgEl.alt = allProductsArr[idx].name;
    allProductsArr[idx].views++;
  });
}

renderProducts();

// *********************************************
//              CHART RENDERING
// *********************************************

function makeChartColors(count, alpha) {
  let colors = [];
  for (let i = 0; i < count; i++) {
    let hue = Math.round((i / count) * 360);
    colors.push(`hsla(${hue}, 70%, 55%, ${alpha})`);
  }
  return colors;
}

function renderChart() {
  let productName = allProductsArr.map(p => p.name);
  let productVotes = allProductsArr.map(p => p.votes);
  let productViews = allProductsArr.map(p => p.views);
  let count = allProductsArr.length;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: makeChartColors(count, 0.7),
        borderColor: makeChartColors(count, 1),
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productViews,
        backgroundColor: makeChartColors(count, 0.3),
        borderColor: makeChartColors(count, 0.8),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}


//********************************************
//            EVENT HANDLERS
//******************************************** */

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(allProductsArr));
}

function handleClick(event) {
  let btn = event.target.closest('.product-btn');
  if (!btn) return;

  maxClicksAllowed--;
  votesRemaining.textContent = maxClicksAllowed;

  let imgClicked = btn.querySelector('img').alt;

  for (let i = 0; i < allProductsArr.length; i++) {
    if (imgClicked === allProductsArr[i].name) {
      allProductsArr[i].votes++;
      allProductsArr[i].views++;
    }
  }
  saveProducts();
  renderProducts();

  if (maxClicksAllowed === 0) {
    handleShowResults();
  }
}

function handleShowResults() {
  productContainer.removeEventListener('click', handleClick);
  instructions.hidden = true;
  chartContainer.hidden = false;
  renderChart();
}

//****************************************
//            EVENT LISTENERS
//**************************************** 

productContainer.addEventListener('click', handleClick);

saveProducts();

