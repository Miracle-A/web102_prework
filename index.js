/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// Parse the JSON data about the crowd funded games
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Function that adds all data from the games array to the page
function addGamesToPage(games) {
  // Loop over each item in the games array
  games.forEach((game) => {
    // Step 2: Create a new div element for the game card
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card"); // Add the 'game-card' class

    // Step 3: Set the inner HTML using a template literal
    gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()} / Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

    // Step 4: Append the game card to the gamesContainer
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.appendChild(gameCard);
  });
}

// Step 5: Call the function with GAMES_JSON to add all games to the page
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
  (sum, game) => sum + game.backers,
  0
);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerText = totalContributions.toLocaleString();
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
raisedCard.innerText = `$${totalRaised.toLocaleString()}`;
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = GAMES_JSON.length;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */
const gamesContainer = document.getElementById("games-container");
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal)
  .length;

// create a string that explains the number of unfunded games using the ternary operator
const raisedInformation = `$${totalRaised.toLocaleString()} has been raised across ${
  GAMES_JSON.length
} games, with ${numUnfundedGames} ${
  numUnfundedGames === 1 ? "game" : "games"
} still needing funds.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerText = raisedInformation;
descriptionContainer.appendChild(descriptionParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.innerText = topGame.name;
firstGameContainer.appendChild(topGameElement);
// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
