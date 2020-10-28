const bookFactory = (author, title, pages, status) => ({
  author, title, pages, status,
});

const newBookBtn = document.getElementById('newBookBtn');

const formWrapper = document.getElementById('form-wrapper');

function displayForm(form) {
  const swap = form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
  return swap;
}

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

const bookStatus = (status, book, bookLibrary) => {
  status.onclick = () => {
    const changeStatus = book.status === 'read' ? book.status = 'unread' : book.status = 'read';
    localStorage.setItem('library', JSON.stringify(bookLibrary));
    status.textContent = book.status;
    return changeStatus;
  };
};


function displayBook(book, bookLibrary) {
  const section = document.querySelector('#bookDisplay');
  const card = document.createElement('div');
  section.appendChild(card);

  card.appendChild(author(book));
  card.appendChild(title(book));
  card.appendChild(page(book));

  const status = document.createElement('button');
  status.textContent = book.status;
  card.appendChild(status);

  const deleteBookBtn = document.createElement('button');
  deleteBookBtn.textContent = 'delete book';
  card.appendChild(deleteBookBtn);

  bookStatus(status, book, bookLibrary);


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
    const book = bookFactory(author, title, pages, status);
    localBooks.push(book);
    localStorage.setItem('library', JSON.stringify(localBooks));
    loadNewBook(book);
  } else {
    const localBooks = JSON.parse(localStorage.getItem('library'));
    const book = bookFactory(author, title, pages, status);
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
