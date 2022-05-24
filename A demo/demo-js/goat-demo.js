'use strict';

console.log('wush haanen');

// ********* Global Variables **********

let voteCount = 15;
let allGoats = [];

// ********** Dom References

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');

let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

// ********* Constructor

function Goat(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allGoats.push(this);
}

new Goat('bunny-goat', 'png');
new Goat('cool-goat');
new Goat('cruisin-goat');
new Goat('float-your-goat');
new Goat('goat-out-of-hand');
new Goat('kissing-goat');
new Goat('sassy-goat');
new Goat('smiling-goat');
new Goat('sweater-goat');

// ********* Helper Functions / Executable Code

// Math.floor(Math.random()*items.length)
function getRandomIndex() {
  return Math.floor(Math.random()*allGoats.length);
}
// console.log(getRandomIndex);

function renderImg() {
  let goatOneIndex = getRandomIndex();
  let goatTwoIndex = getRandomIndex();

  imgOne.src = allGoats[goatOneIndex].photo;
  imgTwo.src = allGoats[goatTwoIndex].photo;
}

renderImg();

if (voteCount === 0) {
  imgContainer.removeEventListener('click', handleClick);
}

function handleShowResults() {
  if(voteCount === 0) {
    for(let i = 0; i < allGoats.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent =
    }
  }
}

// ********* Event Handlers

function handleClick(event) {
  
  let imgClicked = event.target.alt;

  for(let i = 0; i < allGoats.length; i++) {
    if(imgClicked === allGoats[i].name) {
      allGoats[i].votes++;
    }
  }

  console.log('img clicked', imgClicked);
}
// ********* Event Listeners

imgContainer.addEventListener('click', handleClick);
