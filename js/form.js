function generateAddBookForm() {
  const canvas = document.createElement("div");
  canvas.setAttribute("class", "canvas");

  createCloseButton(canvas);

  const formContainer = document.createElement("form");
  formContainer.setAttribute("class", "form");
  formContainer.setAttribute("id", "addBookForm");
  formContainer.addEventListener("submit", (e) => formAddBookSubmit(e));

  createTypedInput(formContainer, "title", "text");
  createTypedInput(formContainer, "author", "text");
  createTypedInput(formContainer, "pages", "number");
  createSelectInput(formContainer, "read", [
    {text: "Yes", value: "true"},
    {text: "No", value: "false"},
  ]);
  createFormControls(formContainer);

  canvas.appendChild(formContainer);
  body.appendChild(canvas);
}

function createCloseButton(parent) {
  const formClose = document.createElement("button");
  formClose.setAttribute("class", "canvas__close fas fa-times-circle");
  formClose.setAttribute("id", "closeCanvas");
  formClose.setAttribute("type", "button");
  formClose.addEventListener("click", () => {
    parent.remove();
  })
  parent.appendChild(formClose);
}

function createTypedInput(parent, name, type) {
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
  inputContainer.appendChild(inputField);

  parent.appendChild(inputContainer);
}

function createSelectInput(parent, name, options) {
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

    inputField.appendChild(optionField);
  });
  inputContainer.appendChild(inputField);

  parent.appendChild(inputContainer);
}

function createFormControls(parent) {
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", `form__control control__container`);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("class", "form__button form__submit");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Add";
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

  const formName = e.target.id;
  const formElements = e.target.elements;
  const title = formElements.title.value;
  const author = formElements.author.value;
  const pages = formElements.pages.value;
  const read = formElements.read.value;

  addBookToLibrary(title, author, pages, read);

  e.target.reset();
  refreshDisplay();
  alert(`${title} by ${author} was added.`);
  }

// utility functions
function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}