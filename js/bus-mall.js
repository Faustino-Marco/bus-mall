'use strict';

console.log('live long and prosper');

// ***********GLOBAL VARIABLES****************

let voteCount = 15; 
let allProductsArr = [];

let productContainer = document.getElementById('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let maxClicksAllowed = 10;

//************CONSTRUCTOR*********************

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;

  Product.allProductsArr.push(this);
}

Product.allProductsArr = [];
//************HELPER FUNCTIONS****************

// RANDOM # GENERATOR
function randNum () {
  return Math.floor(Math.random()*Product.allProductsArr.length);
}

// IMAGE RENDERING ALGORITHM
function renderProducts() {
  let prod1 = randNum();
  let prod2 = randNum();
  let prod3 = randNum();

  // MANAGE DUPLICATES & TRIPLE COPIES
  while(prod1 === prod2 || prod3){
  }

  // INCREMENT VIEWS/CLICKS PROPERTIES
}

//************EVENT HANDLERS******************

function handleClick(event) {

  let imgClicks = event.target.alt;


}

//************EVENT LISTENERS*****************

productContainer.addEventListener('click', handleClick);

