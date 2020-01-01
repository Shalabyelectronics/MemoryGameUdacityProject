/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll(".card");
let icons = [];
let sympole = 0;
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let stars = 3;

function startGame() {
  cardsShuffling();
  restGame();
}

startGame();

function cardsShuffling() {
  //we need to save all sympols we have in our cards inside icons array.
  cards.forEach(card => {
    let icon = card.children[0].className;
    icons.push(icon);
  });

  //we need to add the icons to our cards after shaffling all of them
  shuffle(icons);
  cards.forEach(card => {
    card.children[0].className = icons[sympole];
    sympole++;
    card.addEventListener("click", flipcards);
  });
}

//we need to add event listeners to our cards
function flipcards() {
  if (flippedCards.length < 2) {
    this.classList.add("open", "show", "disable");
    flippedCards.push(this);
    if (flippedCards.length == 2) {
      setTimeout(compareCards, 1000);
    }
  }
}
function compareCards() {
  let firstCard = flippedCards[0];
  let secondCard = flippedCards[1];
  let firstCardIcon = firstCard.children[0].className;
  let secondCardIcon = secondCard.children[0].className;
  if (firstCardIcon == secondCardIcon) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matchedCards++;
  } else {
    firstCard.classList.remove("open", "show", "disable");
    secondCard.classList.remove("open", "show", "disable");
  }
  flippedCards = [];
  moves++;
  counter();
  starsScore();
  endGame();
}

function counter() {
  updateMoves = document.querySelector(".moves");
  updateMoves.innerText = moves;
}
function updateStars() {
  const starsBar = document.querySelector(".stars");
  starsBar.innerHTML = "";
  for (let i = 0; i < star; i++) {
    let addStar = "<li><i class='fa fa-star'></i></li>";
    starsBar.innerHTML += addStar;
  }
}

function starsScore() {
  if (moves < 6) {
    star = 3;
    console.log(`you have ${star} stars`);
  } else if (moves < 10) {
    star = 2;
    console.log(`you have ${star} stars`);
  } else {
    star = 1;
    console.log(`you have ${star} stars`);
  }
  updateStars();
}

function endGame() {
  if (matchedCards == 8) {
    alert("Game is finished");
  }
}

function restGame() {
  let restBtn = document.querySelector(".restart");
  restBtn.addEventListener("click", function() {
    console.log("do restart");
  });
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
