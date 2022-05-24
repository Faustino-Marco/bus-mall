'use strict';

console.log('live long and prosper');

// ***********GLOBAL VARIABLES****************

let voteCount = 15; 
let allProductsArr = [];

let productContainer = document.getElementById('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child'); //****************** */
let image2 = document.querySelector('section img:nth-child(2)'); //**************** */
let image3 = document.querySelector('img-3?') // ***************************************** ??????????

let clicks = 0;
let maxClicksAllowed = 10;

//************CONSTRUCTOR*********************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.photo = `assets/${name}.${fileExtension}`

  Product.allProductsArr.push(this);
}

Product.allProductsArr = [];

// **************INSTANTIATION******************
new Product('name', 'png')
//************HELPER FUNCTIONS****************

// RANDOM # GENERATOR
function randNum () {
  return Math.floor(Math.random()*Product.allProductsArr.length);
}

// IMAGE RENDERING ALGORITHM

let indexArr = [];


function renderProducts() {
  
  // MANAGE DUPLICATES & TRIPLE COPIES
  while(indexArray.length < 3) {
    let randoNum = randNum();

    if(!indexArr.includes(randoNum)) {
      indexArr.push(randoNum);
    }
  }

  let imgOneIndex = indexArr.pop();
  let imgTwoIndex = indexArr.pop();
  let imgThreeIndex = indexArr.pop();

  image1.src = allProductsArr[imgOneIndex]
  image1.alt = allProductsArr[imgOneIndex]
  allProductsArr

  // INCREMENT VIEWS/CLICKS PROPERTIES
}

renderProducts(); 
//************EVENT HANDLERS******************

function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for(let i = 0; i <allProductsArr.length; i++) {
    if (imgClicked === allProductsArr[i].name) {
      allProductsArr[i].votes++;
    }
  }
}

renderProducts();

function handleResults() {
  if(voteCount === 0) {
    productContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  //create li's for results
}

//************EVENT LISTENERS*****************

productContainer.addEventListener('click', handleClick);
showResults

