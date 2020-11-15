let sampleLibrary = [
  {title: "The Bitcoin Standard: The Decentralized Alternative to Central Banking", author: "Saifedean Ammous", pages: "304", read: true, bookid: 1},
  {title: "The Internet of Money: A collection of talks", author: "Andreas M. Antonopoulos", pages: "152", read: false, bookid: 2},
  {title: "Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money", author: "Nathaniel Popper", pages: "432", read: false, bookid: 3},
];

let myLibrary = [];

class Book {
  constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookid = myLibrary.length == 0 ? 1 : myLibrary[myLibrary.length - 1].bookid + 1;
  };
}

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

// if localStorage empty, populates with sampleLibrary
function getLocalStorage() {
  !storageAvailable("localStorage") ? myLibrary = sampleLibrary:
  localStorage.myLibrary == "[]" ? myLibrary = sampleLibrary:
  localStorage.myLibrary ? myLibrary = JSON.parse(localStorage.myLibrary):
  myLibrary = sampleLibrary;
}

function setLocalStorage() {
  localStorage.myLibrary = JSON.stringify(myLibrary);
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