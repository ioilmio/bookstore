function Book(author, title, pages, status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

// function toggleStatus(book, bookLibrary) {
//   book.status === 'read' ? book.status = 'unread' : book.status = 'read';
//   localStorage.setItem('library', JSON.stringify(bookLibrary));
//   status.textContent = book.status;
// }

// function deleteBook(book, deleteBookBtn, bookLibrary) {
//   deleteBookBtn.parentNode.remove();
//   let bookIndex = bookLibrary.indexOf(book);
//   bookLibrary.splice(bookIndex, 1);
//   localStorage.setItem('library', JSON.stringify(bookLibrary));
// }

const bookBtn = document.getElementById('bookBtn'); //suspicious, should it be newBookBtn id?

const formWrapper = document.getElementById('form-wrapper');

function displayForm(form) {
  form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
}

newBookBtn.onclick = () => displayForm(formWrapper);

function addBookToLibrary(event) {
  let author = document.getElementById('author').value;
  let title = document.querySelector('#title').value;
  let pages = document.getElementById('pages').value;
  let status = document.getElementById('status').value;

  if (!JSON.parse(localStorage.getItem('library'))) {
    let localBooks = [];
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    loadNewBook(book);
  } else {
    let localBooks = JSON.parse(localStorage.getItem('library'));
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    loadNewBook(book);
  }
  event.preventDefault();
}

const form = document.getElementById('form');

form.addEventListener('submit', addBookToLibrary);

const section = document.querySelector('#bookDisplay');

function displayBook(book, bookLibrary) {
  const card = document.createElement('div');
  const author = document.createElement('h3');
  author.textContent = book.author;
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = book.title;
  const pages = document.createElement('h5');
  pages.textContent = book.pages;
  const status = document.createElement('button');
  status.textContent = book.status;
  const deleteBookBtn = document.createElement('button');
  deleteBookBtn.textContent = 'delete book';
  section.appendChild(card);
  card.appendChild(author);
  card.appendChild(bookTitle);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(deleteBookBtn);

  // status.onclick = toggleStatus(book, bookLibrary);

  status.onclick = () => {
    book.status === 'read' ? book.status = 'unread' : book.status = 'read';
    localStorage.setItem('library', JSON.stringify(bookLibrary));
    status.textContent = book.status;
  }

  // deleteBookBtn.onclick = deleteBook(book, deleteBookBtn, bookLibrary);

  deleteBookBtn.onclick = () => {
    deleteBookBtn.parentNode.remove();
    let bookIndex = bookLibrary.indexOf(book);
    bookLibrary.splice(bookIndex, 1);
    localStorage.setItem('library', JSON.stringify(bookLibrary));
  }
}

function loadNewBook(book) {
  let bookLibrary = JSON.parse(localStorage.getItem('library'));

  let newBook = bookLibrary.find(element => element === book);

  displayBook(newBook, bookLibrary);
}

function loadLibrary() {
  let bookLibrary = JSON.parse(localStorage.getItem('library'));

  if (bookLibrary) {
    bookLibrary.forEach(book => {
      displayBook(book, bookLibrary);
    });
  }
}

window.addEventListener("load", loadLibrary);
