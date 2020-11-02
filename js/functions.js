let myLibrary = [];
let bookIdCounter = 0;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookid = bookIdCounter++;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("The Bitcoin Standard: The Decentralized Alternative to Central Banking", "Saifedean Ammous", "304", true);
addBookToLibrary("The Internet of Money: A collection of talks", "Andreas M. Antonopoulos", "152", false);
addBookToLibrary("Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money", "Nathaniel Popper", "432", false);