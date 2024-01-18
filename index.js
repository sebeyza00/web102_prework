/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
const TOTALGAMES = GAMES_JSON.length;


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/


// create the element inside the total raised box with the totalPledged amount.








// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
// iterates 11 times
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) { // loop over each item in the data
        let game = games[i];
        let newCard = document.createElement("div"); // create a new div element, which will become the game card
        newCard.classList.add("game-card"); // add the class game-card to the list
        newCard.innerHTML = ` 
        <img class="game-img" src="${game["img"]}">
        <h2>${game["name"]}</h2>
        <h4>${game["description"]}</h4>
        <h4>Goal: $${game["goal"]}</h4>
        <h4>Pledged: $${game["pledged"]}</h4>
        `; // set the inner HTML using a template literal to display some info 
        gamesContainer.appendChild(newCard);
    }


    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")


    // append the game to the games-container

}
addGamesToPage(GAMES_JSON)
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

let totalContributors = GAMES_JSON.reduce((acc, game) => { return acc + game.backers }, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributors.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalPledged = GAMES_JSON.reduce((accumulator, game) => { return accumulator + game.pledged }, 0)
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGames = GAMES_JSON.reduce((acc, game) => { return acc + 1 }, 0);
gamesCard.innerHTML = `${totalGames.toLocaleString('en-US')}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let notMetGoalList = GAMES_JSON.filter((game) => { return game.pledged < game.goal; })
    console.log(notMetGoalList.length)


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(notMetGoalList);

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let metGoalList = GAMES_JSON.filter((game) => { return game.pledged > game.goal; })
    console.log(metGoalList.length)


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(metGoalList);

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
let unfundedGames = GAMES_JSON.filter((game) => { return game.pledged < game.goal; }); // if true, added to S[] array.
const TOTALUNFUNDED = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayedString = `A total of $${totalPledged.toLocaleString("en-US")} has been raised for ${TOTALGAMES} ${TOTALGAMES > 1 ? "games" : "game"}. Currently ${TOTALUNFUNDED} ${TOTALUNFUNDED > 1 ? "games" : "game"} remains unfunded. We need your help to fund these amazing games!`;
console.log(displayedString);

// create a new DOM element containing the template string and append it to the description container
let newStringElement = document.createElement("p");
newStringElement.innerHTML = displayedString

let descriptionElement = document.getElementById("description-container");
descriptionElement.append(newStringElement);
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
let [highestPledge, secondHighestPledge] = sortedGames;
console.log(highestPledge)
console.log(secondHighestPledge)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let highestPledgeElement = document.createElement("p");
highestPledgeElement.innerHTML = highestPledge.name;
const highestGame = document.getElementById("first-game");
highestGame.append(highestPledgeElement);
// do the same for the runner up item
let secondHighestPledgeElement = document.createElement("p");
secondHighestPledgeElement.innerHTML = secondHighestPledge.name;
const secondHighest = document.getElementById("second-game");
secondHighest.append(secondHighestPledgeElement);
