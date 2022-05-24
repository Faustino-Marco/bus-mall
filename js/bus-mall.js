'use strict';

console.log('live long and prosper');

// ***********GLOBAL VARIABLES****************

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

function randNum () {
  return Math.floor(Math.random()*Product.allProductsArr.length);
}

function renderProducts() {
  let prod1 = randNum();
  let prod2 = randNum();
  let prod3 = randNum();

  // deal with dupilcates & triplets 
  while(prod1 === prod2 || prod3){
  }

}

//************EVENT HANDLERS******************
//************EVENT LISTENERS*****************

