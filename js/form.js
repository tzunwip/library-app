function _generateCanvas() {
  const body = document.querySelector("body");
  const canvas = document.querySelector(".canvas");

  if (canvas) {
    canvas.textContent = "";
    return canvas;
  } else {
    const newCanvas = document.createElement("div");
    newCanvas.setAttribute("class", "canvas");
    body.appendChild(newCanvas);
    return newCanvas;
  }
}

function generateAddBookForm() {
  const canvas = _generateCanvas();
  canvas.setAttribute("class", "canvas");
  
  const formContainer = document.createElement("form");
  formContainer.setAttribute("class", "form");
  formContainer.setAttribute("id", "addBookForm");
  formContainer.setAttribute("autocomplete", "off");
  formContainer.addEventListener("submit", (e) => formAddBookSubmit(e));
  
  createCloseButton(formContainer);
  createTypedInput(formContainer, "title", "text");
  createTypedInput(formContainer, "author", "text");
  createTypedInput(formContainer, "pages", "number");
  createSelectInput(formContainer, "read", [
    {text: "Yes", value: "true"},
    {text: "No", value: "false"},
  ]);
  createFormControls(formContainer, "Add");

  canvas.appendChild(formContainer);
  body.appendChild(canvas);
}

function generateEditBookForm(targetBook) {
  const canvas = _generateCanvas();
  canvas.setAttribute("class", "canvas");
  
  const formContainer = document.createElement("form");
  formContainer.setAttribute("class", "form");
  formContainer.setAttribute("id", "editBookForm");
  formContainer.setAttribute("autocomplete", "off");
  formContainer.addEventListener("submit", (e) => formEditBookSubmit(e, targetBook.bookid));

  createCloseButton(formContainer);
  createTypedInput(formContainer, "title", "text", targetBook.title);
  createTypedInput(formContainer, "author", "text", targetBook.author);
  createTypedInput(formContainer, "pages", "number", targetBook.pages);
  createSelectInput(formContainer, "read", [
    {text: "Yes", value: true},
    {text: "No", value: false},
  ], targetBook.read);
  createFormControls(formContainer, "Edit");

  canvas.appendChild(formContainer);
  body.appendChild(canvas);
}

function generateAlert(text, func = () => {}) {
  const canvas = document.querySelector(".canvas");

  const alertContainer = document.createElement("div");
  alertContainer.setAttribute("class", "alert");
  window.addEventListener("click", () => {
    document.querySelector(".canvas").remove();
    func();
  }, {once: true});

  const alertText = document.createElement("h3");
  alertText.textContent = text;

  alertContainer.appendChild(alertText);
  canvas.appendChild(alertContainer);
}

function createCloseButton(parent) {
  const formClose = document.createElement("button");
  formClose.setAttribute("class", "canvas__close fas fa-times-circle");
  formClose.setAttribute("id", "closeCanvas");
  formClose.setAttribute("type", "button");
  formClose.addEventListener("click", () => {
    document.querySelector(".canvas").remove();
  })
  parent.appendChild(formClose);
}

function createTypedInput(parent, name, type, placeholder = "") {
  const inputContainer = document.createElement("div");
  inputContainer.setAttribute("class", `form__input ${name}__container`);

  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("class", "input__label");
  inputLabel.setAttribute("for", `input__${name}`);
  inputLabel.textContent = capitalizeFirstChar(name) + ":";
  inputContainer.appendChild(inputLabel);

  const inputField = document.createElement("input");
  inputField.setAttribute("class", `input__field`);
  inputField.setAttribute("id", `input__${name}`);
  inputField.setAttribute("name", `${name}`);
  inputField.setAttribute("type", `${type}`);
  inputField.setAttribute("required", "");
  inputField.setAttribute("value", placeholder);
  inputContainer.appendChild(inputField);

  parent.appendChild(inputContainer);
}

function createSelectInput(parent, name, options, selectedValue) {
  const inputContainer = document.createElement("div");
  inputContainer.setAttribute("class", `form__input ${name}__container`);
  
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("class", "input__label");
  inputLabel.setAttribute("for", `input__${name}`);
  inputLabel.textContent = capitalizeFirstChar(name) + ":";
  inputContainer.appendChild(inputLabel);

  const inputField = document.createElement("select");
  inputField.setAttribute("class", "input__select");
  inputField.setAttribute("id", `input__${name}`);
  inputField.setAttribute("name", `${name}`);
  inputField.setAttribute("required", "");
  options.forEach(obj => {
    const optionField = document.createElement("option");
    
    optionField.setAttribute("value", obj.value);
    optionField.textContent = obj.text;
    if (selectedValue == obj.value) {
      optionField.setAttribute("selected", "true");
    };

    inputField.appendChild(optionField);
  });
  inputContainer.appendChild(inputField);

  parent.appendChild(inputContainer);
}

function createFormControls(parent, submitButtonText = "Submit") {
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", `form__control control__container`);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("class", "form__button form__submit");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = submitButtonText;
  buttonContainer.appendChild(submitButton);

  const resetButton = document.createElement("button");
  resetButton.setAttribute("class", "form__button form__reset");
  resetButton.setAttribute("type", "reset");
  resetButton.textContent = "Reset";
  buttonContainer.appendChild(resetButton);

  parent.appendChild(buttonContainer);
}

function formAddBookSubmit(e) {
  e.preventDefault();

  const formElements = e.target.elements;
  const title = formElements.title.value;
  const author = formElements.author.value;
  const pages = formElements.pages.value;
  const read = formElements.read.value;

  addBookToLibrary(title, author, pages, read);

  e.target.remove();
  refreshDisplay();
  generateAlert("Successfully added", generateAddBookForm);
}

function formEditBookSubmit(e, targetBookId) {
  e.preventDefault();

  const formElements = e.target.elements;
  const title = formElements.title.value;
  const author = formElements.author.value;
  const pages = formElements.pages.value;
  const read = formElements.read.value;

  editBook(targetBookId, title, author, pages, read);

  e.target.remove();
  refreshDisplay();
  generateAlert("Successfully edited");
}

// utility functions
function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}