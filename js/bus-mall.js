'use strict';

let allProductsArr = [];

let productContainer = document.getElementById('products');
let image1 = document.getElementById('imgOne');
let image2 = document.getElementById('imgTwo');
let image3 = document.getElementById('imgThree');
let instructions = document.getElementById('instructions');
let votesRemaining = document.getElementById('votes-remaining');
let chartCanvas = document.getElementById('myChart');

let ctx = chartCanvas.getContext('2d');
// ***********Click Variables****************

let clicks = 0;
let maxClicksAllowed = 25;
let uniqueImageCount = 6;
// *******************************************
//             CONSTRUCTOR
//********************************************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`

  allProductsArr.push(this);
}

// *********************************************
//     INSTANTIATION & LOCAL STORAGE PT 2
// *********************************************

let retrievedProducts = localStorage.getItem('products');

// LOCAL STORAGE PT 4
let parsedProducts = JSON.parse(retrievedProducts);

// EASY WAY
if (retrievedProducts) {
  allProductsArr = parsedProducts;
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

  // MANAGE DUPLICATES & TRIPLE COPIES
  // 2 ROUNDS: NO LONGER USING POP(); NOW USING SHIFT();
  while (indexArr.length < uniqueImageCount) {
    let randoNum = randNum();

    if (!indexArr.includes(randoNum)) {
      indexArr.push(randoNum);
    }
  }

  let imgOneIndex = indexArr.shift();
  let imgTwoIndex = indexArr.shift();
  let imgThreeIndex = indexArr.shift();

  image1.src = allProductsArr[imgOneIndex].photo;
  image1.alt = allProductsArr[imgOneIndex].name;
  allProductsArr[imgOneIndex].views++;
  image2.src = allProductsArr[imgTwoIndex].photo;
  image2.alt = allProductsArr[imgTwoIndex].name;
  allProductsArr[imgTwoIndex].views++;
  image3.src = allProductsArr[imgThreeIndex].photo;
  image3.alt = allProductsArr[imgThreeIndex].name;
  allProductsArr[imgThreeIndex].views++;

  // INCREMENT VIEWS/CLICKS PROPERTIES


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
  });
}


//********************************************
//            EVENT HANDLERS
//******************************************** */

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(allProductsArr));
}

function handleClick(event) {
  if (event.target.tagName !== 'IMG') return;

  maxClicksAllowed--;
  votesRemaining.textContent = maxClicksAllowed;

  let imgClicked = event.target.alt;

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
  chartCanvas.hidden = false;
  renderChart();
}

//****************************************
//            EVENT LISTENERS
//**************************************** 

productContainer.addEventListener('click', handleClick);

saveProducts();

