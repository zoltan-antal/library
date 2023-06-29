// Handling events

const main = document.querySelector(".main");
const addBookDialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".add-book");
const addBookForm = document.querySelector(".book-form");
let deleteButtons;
let readStatusButtons;

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target.querySelector("#new-book-title").value;
  const author = e.target.querySelector("#new-book-author").value;
  const pages = e.target.querySelector("#new-book-pages").value;
  const read = e.target.querySelector("#new-book-read input").checked;

  addBookToLibrary(title, author, pages, read);

  addBookDialog.close();
  e.target.reset();
})

// Managing library

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function deleteBook(e) {
  bookElement = e.target.closest(".book");
  myLibrary.splice(bookElement.getAttribute("data-index"), 1);
  displayBooks();
}

function changeReadStatus(e) {
  bookElement = e.target.closest(".book");
  myLibrary[bookElement.getAttribute("data-index")].toggleRead();
  displayBooks();
}

// Example books

const book1 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
const book2 = new Book("On the Origin of Species", "Charles Darwin", 416, false);
myLibrary.push(book1);
myLibrary.push(book2);
displayBooks();

// Displaying library

function displayBooks() {
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const bookElement = generateBookElement(myLibrary[i]);
    bookElement.setAttribute("data-index", i);
    main.appendChild(bookElement);
  }

  deleteButtons = document.querySelectorAll("button.delete");
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener("click", deleteBook);
  })

  readStatusButtons = document.querySelectorAll("button.read-status");
  readStatusButtons.forEach(readStatusButtons => {
    readStatusButtons.addEventListener("click", changeReadStatus);
  })
}

function generateBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;
  bookInfo.appendChild(bookTitle);

  const bookAuthor = document.createElement("h3");
  bookAuthor.classList.add("author");
  bookAuthor.textContent = "by " + book.author;
  bookInfo.appendChild(bookAuthor);

  const bookPages = document.createElement("h3");
  bookPages.classList.add("pages");
  bookPages.textContent = book.pages + " pages";
  bookInfo.appendChild(bookPages);

  bookElement.appendChild(bookInfo);

  const bookButtons = document.createElement("div");
  bookButtons.classList.add("book-buttons");

  const bookReadStatus = document.createElement("button");
  bookReadStatus.classList.add("read-status");
  bookReadStatus.classList.add(book.read ? "read" : "unread");
  bookReadStatus.textContent = book.read ? "Read" : "Unread";
  bookButtons.appendChild(bookReadStatus);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  bookButtons.appendChild(deleteButton);

  bookElement.appendChild(bookButtons);

  return bookElement;
}
