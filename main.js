// function initLibrary() {

//   localStorage.setItem('library', localLibrary);
// }


// const library = [
//   {
//     author: 'uncle bob',
//     title: 'clean code',
//     pages: 400,
//     status: false,
//   },
//   {
//     author: 'uncle james',
//     title: 'clean code 2',
//     pages: 500,
//     status: true,
//   },
//   {
//     author: 'uncle dad',
//     title: 'clean code 3',
//     pages: 600,
//     status: true,
//   },
// ];


// function delete(node) {
//   //deleteBook.node.remove;
// }

function Book(author, title, pages, status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}



const newBookBtn = document.getElementById('newBookBtn');

const formWrapper = document.getElementById('form-wrapper');

function displayForm(elem) {
  elem.style.display === 'block' ? elem.style.display = 'none' : elem.style.display = 'block';
}

newBookBtn.onclick = () => displayForm(formWrapper);

function addBookToLibrary(event) {
  let author = form.elements[0].value;
  let title = document.querySelector("#title").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;


  // console.log(form.elements[0].value);
  // console.log(form.elements[1].value);
  // console.log(form.elements[2].value);
  // console.log(form.elements[3].value);
  // localLibrary = localStorage.getItem('library');
  if (!JSON.parse(localStorage.getItem('library'))) {
    let localBooks = [];
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    //localStorage.setItem('library', localBooks);
    localStorage.setItem('library', JSON.stringify(localBooks));
    // displayBook();
    showBook(book);
  } else {
    //let localBooks = Object.values(localStorage);
    let localBooks = JSON.parse(localStorage.getItem('library'));
    //console.log(localLibrary);
    let book = new Book(author, title, pages, status);
    localBooks.push(book);
    //localStorage.setItem('library', localBooks);
    localStorage.setItem('library', JSON.stringify(localBooks));
    showBook(book);
    // displayBook();
  }

  // console.log(form.elements[0].value);
  // console.log(form.elements[1].value);
  // console.log(form.elements[2].value);
  // console.log(form.elements[3].value);
  event.preventDefault();
}

const form = document.getElementById('form');
form.addEventListener('submit', addBookToLibrary);

window.addEventListener("load", displayLibrary);

// window.onstorage = displayBook();



// // remove book object from local storage after delete.

// window.addEventListener('storage', () => {
function displayBook(book) {

  const section = document.querySelector('#bookDisplay');


  // let bookLibrary = JSON.parse(localStorage.getItem('library'));
  // let book = bookLibrary[bookLibrary.length - 1]; //bookLibrary will be null at the start
  console.log(book);
  const card = document.createElement('div');
  const author = document.createElement('h3');
  author.textContent = book.author;
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = book.title;
  const pages = document.createElement('h5');
  pages.textContent = book.pages;
  const status = document.createElement('button');
  status.textContent = book.status;
  const deleteBook = document.createElement('button');
  deleteBook.textContent = 'delete book';
  section.appendChild(card);
  card.appendChild(author);
  card.appendChild(bookTitle);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(deleteBook);
  deleteBook.onclick = () => {
    deleteBook.parentNode.remove();
  }
  // localStorage.removeItem(bookLibrary[bookLibrary.indexOf(book)]);
  // When local storage changes, dump the list to // the console.
  // console.log(JSON.parse(window.localStorage.getItem('library')));
  // });
}

function displayLibrary() {
  const section = document.querySelector('#bookDisplay');

  //let bookLibrary = Object.values(localStorage);
  let bookLibrary = JSON.parse(localStorage.getItem('library'));

  bookLibrary.forEach(book => { //bookLibrary will be null at the start
    const card = document.createElement('div');
    const author = document.createElement('h3');
    author.textContent = book.author;
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    const pages = document.createElement('h5');
    pages.textContent = book.pages;
    const status = document.createElement('button');
    status.textContent = book.status;
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'delete book';
    section.appendChild(card);
    card.appendChild(author);
    card.appendChild(bookTitle);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(deleteBook);
    deleteBook.onclick = () => {
      deleteBook.parentNode.remove();
      // localStorage.removeItem(bookLibrary[bookLibrary.indexOf(book)]);
    }
  });
}
