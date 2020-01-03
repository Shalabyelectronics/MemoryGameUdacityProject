(function() {
  //Get HTML elements
  //const cards hold all cards classes inside an array
  const cards = document.querySelectorAll(".card");
  // const dialog select dialog box element
  const dialogBox = document.querySelector(".dialog-box");
  //const closeDialog hold close button element inside dialogbox
  const closeDialog = document.querySelector(".close-btn");
  //const playAgian hold playAgain button
  const playAgain = document.querySelector(".rst-btn");
  //const restBtn hold restart button element
  const restBtn = document.querySelector(".restart");
  //const updateMoves holds Moves element
  const updateMoves = document.querySelector(".moves");
  //const showMoves holds show moves element in dialogbox
  const showMoves = document.querySelector(".your-moves");
  const numberOfStars = document.querySelector(".stars-num");
  //const timeSpent holds player time spent playing the game in dailogbox
  const timeSpent = document.querySelector(".time-spent");
  // const starBar hold StarsBar elements
  const starsBar = document.querySelector(".stars");
  //const showTimer hold the timer element
  const showTimer = document.querySelector(".timer");

  let icons = []; // holds all my icons classes
  let symbol = 0; //for shuffling cards
  let flippedCards = []; //to holds the flipped card
  let matchedCards = 0; //to holds the matched cards
  let moves = 0; //to holds the moves player did each two cards opened add+1
  let stars = 3; //to holds numbers of stars
  let timer = null; //to hold my interVal function
  let now = 0; //current timer
  let mins, secs;

  function startGame() {
    clearValues(); // to clear all Values
    cardsShuffling(); //to shuffling my cards
    timerByFirstCard(); //timer start when flip a crad
    restartBtn(); //restart button
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
      card.children[0].className = icons[symbol];
      symbol++;
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
  function faceDownCards() {
    cards.forEach(card => {
      card.className = "card";
    });
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
    updateMoves.innerText = moves;
  }
  function updateStars() {
    starsBar.innerHTML = "";
    for (let i = 0; i < stars; i++) {
      let addStar = "<li><i class='fa fa-star'></i></li>";
      starsBar.innerHTML += addStar;
    }
  }

  function starsScore() {
    if (moves < 15) {
      stars = 3;
    } else if (moves < 20) {
      stars = 2;
    } else {
      stars = 1;
    }
    updateStars();
  }

  function endGame() {
    if (matchedCards == 8) {
      showDailogBox();
      stopTimer();
    }
    closeDialog.addEventListener("click", closeDialogBox);
    playAgain.addEventListener("click", startGame);
  }

  function restartBtn() {
    restBtn.addEventListener("click", startGame);
  }

  function showDailogBox() {
    dialogBox.showModal();
    showMoves.innerText = `Your Moves : ${moves}`;
    timeSpent.innerText = `You spent ${mins}:${secs} of time.`;
    numberOfStars.innerText = `You got ${stars} of stars`;
  }

  function closeDialogBox() {
    dialogBox.close();
  }

  function clearValues() {
    moves = 0;
    stars = 3;
    matchedCards = 0;
    symbol = 0;
    icons = [];
    flippedCards = [];
    updateMoves.innerText = moves;
    updateStars();
    closeDialogBox();
    faceDownCards();
    resetTimer();
  }

  function tick() {
    //tick() update display if player click on card so time will start
    now++;
    let remain = now;
    mins = Math.floor(remain / 60);
    remain -= mins * 60;
    secs = remain;
    //update the display timer
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    showTimer.innerHTML = mins + ":" + secs;
  }
  function startTimer() {
    //start the timer
    timer = setInterval(tick, 1000);
    cards.forEach(card => {
      card.removeEventListener("click", startTimer);
    });
  }
  function timerByFirstCard() {
    cards.forEach(card => {
      card.addEventListener("click", startTimer);
    });
  }
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }
  function resetTimer() {
    if (timer != null) {
      stopTimer();
    }
    now = -1;
    tick();
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
})();
