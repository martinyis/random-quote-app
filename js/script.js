console.log("helo");
//VARIABLES===================================================================================================
const reloadButton = document.querySelector(".header__random");
const quoteBox = document.getElementById("quotes__box");
const threeQuotesBox = document.getElementById("threequotes-box");
const quoteBody = document.querySelector(".quotes__body");
const moreQuotes = document.querySelector(".quotes__more");
const backBtn = document.querySelector(".header__back");
//Name variables
const name = document.getElementById("quotes__person-name");
const threeName = document.getElementById("quotes__more-name");
const job = document.getElementById("quotes__person-job");
//Change container variable

const changeContainer = document.querySelector(".quotes__showbox");
const APIURL = "https://api.quotable.io/random";

//MAIN FUNCtIONS===================================================================================================
async function getQuote() {
  if (quoteBody.classList.contains("hidden")) return;
  const response = await fetch(APIURL);
  const data = await response.json();
  //remove old quote
  quoteBox.innerHTML = "";
  const quote = document.createElement("div");
  quote.classList.add("quotes__quote");
  quote.innerText = `${data.content}`;
  quoteBox.appendChild(quote);
  addInfo(data.author);
  addMoreQuotes(data.author);
}

function addInfo(data) {
  name.innerHTML = "";
  name.innerHTML = `${data}`;
}
async function addMoreQuotes(name) {
  const response = await fetch(`https://api.quotable.io/quotes?author=${name}`);
  const data = await response.json();
  const quotes = data.results;
  threeQuotesBox.innerHTML = "";
  threeName.textContent = "";
  quotes.slice(0, 3).forEach((quote) => {
    const quoteBox = document.createElement("div");
    quoteBox.classList.add("quotes__quote", "quote-withpad");
    quoteBox.innerText = `${quote.content}`;
    threeQuotesBox.appendChild(quoteBox);
  });
  threeName.textContent = `${name}`;
}

//CALL FUNCTIONS===================================================================================================
changeContainer.addEventListener("click", function () {
  quoteBody.classList.add("hidden");
  moreQuotes.classList.remove("hidden");
  moreQuotes.style.display = "flex";
});
backBtn.addEventListener("click", function () {
  quoteBody.classList.remove("hidden");
  moreQuotes.classList.add("hidden");
  moreQuotes.style.display = "";
});
reloadButton.addEventListener("click", getQuote);
getQuote();
