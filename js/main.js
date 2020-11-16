// variables
const body = document.querySelector("body");
const displayStyle = "card";

// DOM functions
function generateNavbar(parent) {
  const navbar = document.createElement("div");
  navbar.setAttribute("class", "navbar");

  const titleDiv = document.createElement("span");
  titleDiv.setAttribute("class", "navbar__title");

  const titleText = document.createElement("h1");
  titleText.textContent = "My Library";

  titleDiv.appendChild(titleText);
  navbar.appendChild(titleDiv);

  const btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "navbar__btnBox");
  createButton(btnDiv, "addBook", `fas fa-book-medical`, generateAddBookForm);
  navbar.appendChild(btnDiv);

  parent.appendChild(navbar);
}

function generateDisplay(parent) {
  const display = document.createElement("div");
  display.setAttribute("class", `display display--${displayStyle}`);

  parent.appendChild(display);
}

function generateFooter(parent) {
  const footer = document.createElement("div");
  footer.setAttribute("class", "footer");

  createLinkIcon(footer, "github", `fab fa-github-square`, "https://github.com/tzunwip/library-app");

  parent.appendChild(footer);
}

// utility functions
function createButton(parent, name, fa, func) {
  const button = document.createElement("div");
  button.setAttribute("class", `btn btn__${name} ${fa}`);
  button.addEventListener("click", func);
  parent.appendChild(button);
}

function createLinkIcon(parent, name, fa, url) {
  const link = document.createElement("a");
  link.setAttribute("class", `linkicon linkicon__${name} ${fa}`);
  link.setAttribute("href", url);
  parent.appendChild(link);
}

function createCard(parent, obj) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("id", obj.bookid)

  const deleteButton = document.createElement("i");
  deleteButton.setAttribute("class", "card__delete fas fa-times");
  deleteButton.addEventListener("click", () => deleteCard(card));
  card.appendChild(deleteButton);

  const cardTitle = document.createElement("h2");
  cardTitle.setAttribute("class", "card__title");
  cardTitle.textContent = obj.title;
  card.appendChild(cardTitle);

  const by = document.createElement("p");
  by.textContent = "by";
  card.appendChild(by);

  const cardAuthor = document.createElement("h3");
  cardAuthor.setAttribute("class", "card__author");
  cardAuthor.textContent = obj.author;
  card.appendChild(cardAuthor);

  const cardPages = document.createElement("h4");
  cardPages.setAttribute("class", "card__pages");
  cardPages.textContent = `${obj.pages} pages`;
  card.appendChild(cardPages);

  const cardIconContainer = document.createElement("div");
  cardIconContainer.setAttribute("class", "card__icon-container");

  const readIcon = document.createElement("i");
  readIcon.setAttribute("class", `readicon readicon--${obj.read} far fa-check-circle`);
  readIcon.addEventListener("click", () => toggleReadStatus(readIcon, obj.bookid));
  cardIconContainer.appendChild(readIcon);

  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", `editicon fas fa-pencil-alt`);
  editIcon.addEventListener("click", () => generateEditBookForm(obj));
  cardIconContainer.appendChild(editIcon);

  card.appendChild(cardIconContainer);

  parent.appendChild(card);
}

function deleteCard(parent) {
  parent.remove();

  removeBookFromLibrary(parent.id);
}

function refreshDisplay(inputArray = myLibrary) {
  const displaySelector = document.querySelector(".display");

  displaySelector.textContent = "";

  inputArray.forEach(obj => {
    createCard(displaySelector, obj);
  })
}

function toggleReadStatus(icon, id) {
  const targetIndex = myLibrary.findIndex((obj) => {
    return obj.bookid == id ? 1 : 0});

  myLibrary[targetIndex].read = !myLibrary[targetIndex].read;

  icon.classList.toggle("readicon--true");
  icon.classList.toggle("readicon--false");
}

// initialization
function initialize() {
  getLocalStorage();
  generateNavbar(body);
  generateDisplay(body);
  refreshDisplay();
  generateFooter(body);
}

initialize();