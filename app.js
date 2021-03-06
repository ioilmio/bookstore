class Book {
  constructor(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
  }
}

class Storage {
  static getBooks() {
    return JSON.parse(localStorage.getItem('library')) || [];
  }

  static addBook(book) {
    const library = Storage.getBooks();

    library.push(book);

    localStorage.setItem('library', JSON.stringify(library));
  }

  static removeBook(author, pages, title) {
    const library = Storage.getBooks();

    library.forEach((book, index) => {
      if (book.author === author && book.pages === pages && book.title === title) {
        library.splice(index, 1);
      }
    });
    localStorage.setItem('library', JSON.stringify(library));
  }


  static toggleStatus(author, title) {
    const library = Storage.getBooks();

    library.forEach((book) => {
      if (book.author === author && book.title === title) {
        book.status = (book.status === 'read') ? book.status = 'unread' : book.status = 'read';
      }
      localStorage.setItem('library', JSON.stringify(library));
    });
  }
}
class UI {
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const section = document.querySelector('#bookDisplay');
    const card = document.createElement('div');
    card.classList += 'card';

    const author = (book) => {
      const author = document.createElement('h3');
      author.textContent = book.author;
      return author;
    };
    const title = (book) => {
      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.title;
      return bookTitle;
    };
    const page = (book) => {
      const pages = document.createElement('h5');
      pages.textContent = book.pages;
      return pages;
    };

    const statusBtnHtml = () => {
      const status = document.createElement('button');
      status.textContent = book.status;
      status.classList += 'toggleStatusBtn';
      return status;
    };

    const status = statusBtnHtml();


    const deleteBook = () => {
      const deleteBookBtn = document.createElement('button');
      deleteBookBtn.textContent = 'delete book';
      deleteBookBtn.classList += 'delete';
      return deleteBookBtn;
    };

    const deleteBookBtn = deleteBook();

    section.appendChild(card);
    card.appendChild(author(book));
    card.appendChild(title(book));
    card.appendChild(page(book));
    card.appendChild(status);
    card.appendChild(deleteBookBtn);
  }


  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
  }

  static removeBook(el) {
    if (el.classList.contains('delete')) {
      el.parentNode.remove();
    }
  }
}


// Toggle form
const newBookBtn = document.querySelector('#newBookBtn');
const formWrapper = document.querySelector('#form-wrapper');
function displayForm(form) {
  const swap = form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
  return swap;
}
newBookBtn.addEventListener('click', () => displayForm(formWrapper));


// Event Display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event Add book
function addBooks(e) {
  const author = document.getElementById('author').value;
  const title = document.querySelector('#title').value;
  const pages = document.getElementById('pages').value;
  const status = document.querySelector('input[name="status"]:checked').value;

  const book = new Book(author, title, pages, status);

  e.preventDefault();
  Storage.addBook(book);
  UI.addBookToLibrary(book);
  UI.clearFields();
}

const form = document.getElementById('form');

form.addEventListener('submit', addBooks);

// Toggle status


document.querySelector('#bookDisplay').addEventListener('click', (e) => {
  if(e.target.classList.contains('toggleStatusBtn')){
    e.target.textContent = (
      e.target.textContent === 'read')
      ? e.target.textContent = 'unread'
      : e.target.textContent = 'read';
    }
});

// Remove book

document.querySelector('#bookDisplay').addEventListener('click', (e) => {

  if(e.target.classList.contains('delete')){
  UI.removeBook(e.target);

  Storage.removeBook(e.target.parentNode.firstChild.textContent,
    e.target.previousSibling.previousSibling.textContent,
    e.target.previousSibling.previousSibling.previousSibling.textContent);
  }
});

document.querySelector('#bookDisplay').addEventListener('click', (e) => {
  if(e.target.classList.contains('toggleStatusBtn')){

    Storage.toggleStatus(e.target.parentNode.firstChild.textContent,
      e.target.previousSibling.previousSibling.textContent,
      e.target.previousSibling.previousSibling.previousSibling.textContent);
    }
});
