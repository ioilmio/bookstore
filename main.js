function Book(author, title, pages, status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

const newBookBtn = document.getElementById('newBookBtn');

const formWrapper = document.getElementById('form-wrapper');

function displayForm(form) {
  const swap = form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
  return swap;
}
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

  status.onclick = () => {
    const changeStatus = book.status === 'read' ? book.status = 'unread' : book.status = 'read';
    localStorage.setItem('library', JSON.stringify(bookLibrary));
    status.textContent = book.status;
    return changeStatus;
  };


  deleteBookBtn.onclick = () => {
    deleteBookBtn.parentNode.remove();
    const bookIndex = bookLibrary.indexOf(book);
    bookLibrary.splice(bookIndex, 1);
    localStorage.setItem('library', JSON.stringify(bookLibrary));
  };
}

function loadNewBook(book) {
  const bookLibrary = JSON.parse(localStorage.getItem('library'));
  const newBook = bookLibrary.find(element => element === book);
  displayBook(newBook, bookLibrary);
}

newBookBtn.onclick = () => displayForm(formWrapper);

function addBookToLibrary(event) {
  const author = document.getElementById('author').value;
  const title = document.querySelector('#title').value;
  const pages = document.getElementById('pages').value;
  const status = document.querySelector('input[name="status"]:checked').value;

  if (!JSON.parse(localStorage.getItem('library'))) {
    const localBooks = [];
    const book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    loadNewBook(book);
  } else {
    const localBooks = JSON.parse(localStorage.getItem('library'));
    const book = new Book(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    loadNewBook(book);
  }
  event.preventDefault();
}

const form = document.getElementById('form');

form.addEventListener('submit', addBookToLibrary);

function loadLibrary() {
  const bookLibrary = JSON.parse(localStorage.getItem('library'));

  if (bookLibrary) {
    bookLibrary.forEach(book => {
      displayBook(book, bookLibrary);
    });
  }
}

window.addEventListener('load', loadLibrary);
