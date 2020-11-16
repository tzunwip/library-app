class Book {
  constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookid = bookIdCount++;
  };
}

let bookIdCount = 0;
let myLibrary = [
  new Book("The Bitcoin Standard: The Decentralized Alternative to Central Banking", "Saifedean Ammous", "304", true),
  new Book("The Internet of Money: A collection of talks",  "Andreas M. Antonopoulos", "152", false), 
  new Book("Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money", "Nathaniel Popper", "432", false),
];

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));

  setLocalStorage();
}

function removeBookFromLibrary(id) {
  const targetBook = myLibrary.findIndex(obj => {
    return obj.bookid == id ? 1 : 0;
  })
  myLibrary.splice(targetBook, 1);

  setLocalStorage();
}

function editBook(targetBookId, title, author, pages, read) {
  const targetBookIndex = myLibrary.findIndex(obj => obj.bookid == targetBookId);
  const targetBook = myLibrary[targetBookIndex]
  console.log(targetBookId);
  
  targetBook.title = title
  targetBook.author = author;
  targetBook.pages = pages;
  targetBook.read = read;

  setLocalStorage();
}

// if localStorage empty, populates with sampleLibrary
function getLocalStorage() {
  if (localStorage.myLibrary !== "[]") {
    bookIdCount = JSON.parse(localStorage.bookIdCount);
    myLibrary = JSON.parse(localStorage.myLibrary)
  };
}

function setLocalStorage() {
  localStorage.myLibrary = JSON.stringify(myLibrary);
  localStorage.bookIdCount = JSON.stringify(bookIdCount);
}

function storageAvailable(type) {
  let storage;
  try {
      storage = window[type];
      let x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}