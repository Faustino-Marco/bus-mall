'use strict';

//****************************************
//          GLOBAL VARIABLES
// ****************************************

let voteCount = 0;
let allProductsArr = [];

let productContainer = document.getElementById('products');
// let resultButton = document.querySelector('section + div'); ADDDD BUTTTONNNNNNN
let image1 = document.getElementById('imgOne');
let image2 = document.getElementById('imgTwo');
let image3 = document.getElementById('imgThree');

let ctx = document.getElementById('myChart').getContext('2d');
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

// Product.allProductsArr = [];


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
// ...to replace resuts li rendering function
function renderChart() {

  let productName = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < allProductsArr.length; i++) {
    productName.push(allProductsArr[i].name);
    productVotes.push(allProductsArr[i].votes);
    productViews.push(allProductsArr[i].views);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
  });
}


//********************************************
//            EVENT HANDLERS
//******************************************** */

function handleClick(event) {
  maxClicksAllowed--;
  
  let imgClicked = event.target.alt;
  
  for (let i = 0; i < allProductsArr.length; i++) {
    if (imgClicked === allProductsArr[i].name) {
      allProductsArr[i].votes++;
      allProductsArr[i].views++;
    }
  }
  renderProducts();

  if (maxClicksAllowed === 0) {
    handleShowResults();
  }
}

function handleShowResults() {
    productContainer.removeEventListener('click', handleClick);
    renderChart();

}

//****************************************
//            EVENT LISTENERS
//**************************************** 

productContainer.addEventListener('click', handleClick);

/* **********************************************
                  LOCAL STORAGE
********************************************** */

// STEP 1: STRINGIFY DATA
let stringifiedProducts = JSON.stringify(allProductsArr);

// STEP 2: ADD TO LOCAL STORAGE
localStorage.setItem('products', stringifiedProducts);

