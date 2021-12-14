'use strict';

let myLibrary = [];
let book;

// DOM
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numOfPages = document.querySelector('#num-of-pages');
const hasRead = document.querySelector('#read');
const bookTableBody = document.querySelector('#book-table-body');
const formAction = document
  .querySelector('form')
  .addEventListener('submit', e => {
    e.preventDefault();
    Library.prototype.addNewBook();
    Library.prototype.generateTable();
    resetForm();
  });
const bookTable = document
  .querySelector('table')
  .addEventListener('click', e => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == 'Remove') {
      if (
        confirm(
          `"${currentTarget.innerText}" is going to be removed from your library. This action cannot be undone.`
        )
      )
        Library.prototype.removeBook(
          Library.prototype.getBook(myLibrary, currentTarget.innerText)
        );
    }
    if (e.target.classList.contains('status-button')) {
      Library.prototype.updateStatus(
        Library.prototype.getBook(myLibrary, currentTarget.innerText)
      );
    }
    Library.prototype.updateLocalStorage();
    Library.prototype.generateTable();
  });

class Book {
  constructor(bookTitle, bookAuthor, bookNumOfPages, bookRead) {
    // Instance properties
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookNumOfPages = bookNumOfPages;
    this.bookRead = bookRead;
  }

  info() {
    return `${this.bookTitle} by ${this.bookAuthor}, ${
      this.bookNumOfPages
    } pages, ${this.bookRead ? 'already read' : 'not read yet'}.`;
  }
}

class Library {
  updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  checkLocalStorage() {
    if (localStorage.getItem('myLibrary')) {
      myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
  }

  updateStatus(book) {
    if (myLibrary[book]['bookRead'] === 'Read') {
      myLibrary[book].bookRead = 'Not read';
    } else if (myLibrary[book]['bookRead'] === 'Not read') {
      myLibrary[book].bookRead = 'Read';
    } else if (myLibrary[book]['bookRead'] === 'Reading') {
      myLibrary[book].bookRead = 'Read';
    }
  }

  getBook(libraryArray, bookTitle) {
    if (libraryArray.length === 0 || libraryArray === null) {
      return;
    }
    for (book of libraryArray)
      if (book.bookTitle === bookTitle) {
        return libraryArray.indexOf(book);
      }
  }

  removeBook(bookToRemove) {
    myLibrary.splice(bookToRemove, bookToRemove + 1);
  }

  addNewBook() {
    const newBook = new Book(
      title.value,
      author.value,
      numOfPages.value,
      hasRead.value
    );
    myLibrary.push(newBook);
    this.updateLocalStorage();
  }

  generateTable() {
    this.checkLocalStorage();
    bookTableBody.innerHTML = '';
    myLibrary.forEach(book => {
      const htmlBook = `
        <tr>
          <td>${book['bookTitle']}</td>
          <td>${book['bookAuthor']}</td>
          <td>${book['bookNumOfPages']}</td>
          <td><button class="status-button">${book['bookRead']}</button></td>
          <td><button class="remove">Remove</button></td>
        </tr>
        `;
      bookTableBody.insertAdjacentHTML('afterbegin', htmlBook);
    });
  }
}

const resetForm = () => {
  title.value = '';
  author.value = '';
  numOfPages.value = '';
};

Library.prototype.generateTable();
