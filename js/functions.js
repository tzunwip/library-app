let myLibrary = [
  {title: "The Bitcoin Standard: The Decentralized Alternative to Central Banking", author: "Saifedean Ammous", pages: "304", read: true, bookid: 1},
  {title: "The Internet of Money: A collection of talks", author: "Andreas M. Antonopoulos", pages: "152", read: false, bookid: 2},
  {title: "Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money", author: "Nathaniel Popper", pages: "432", read: false, bookid: 3},
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookid = myLibrary.length == 0 ? 1 : myLibrary[myLibrary.length - 1].bookid + 1;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}