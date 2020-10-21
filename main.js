const library = [
  {
    author: 'uncle bob',
    title: 'clean code',
    pages: 400,
    status: false,
  },
  {
    author: 'uncle james',
    title: 'clean code 2',
    pages: 500,
    status: true,
  },
  {
    author: 'uncle dad',
    title: 'clean code 3',
    pages: 600,
    status: true,
  },
];

const section = document.querySelector('#bookDisplay');

library.forEach(book => {
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
  deleteBook.onclick = () => deleteBook.parentNode.remove();
});


// function Book(author, title, pages, status) {
//   this.author = author;
//   this.title = title;
//   this.pages = pages;
//   this.status = status;
// }

const newBookBtn = document.getElementById('newBookBtn');

const formWrapper = document.getElementById('form-wrapper');

function displayForm(elem) {
  elem.style.display === 'block' ? elem.style.display = 'none' : elem.style.display = 'block';
}

newBookBtn.onclick = () => displayForm(formWrapper);

// function addBookToLibrary(book) {
// }




const form = document.getElementById('form');

form.onsubmit = () => {
let author = form.elements[0].value;
let title = document.getElementById("title").value;
let pages = document.getElementById("pages").value;
let status = document.getElementById("status").value;
  
  console.log(form.elements[0].value);


  book = {
    author: author,
    title: title,
    pages: pages,
    status: status
  }
  library.push(book);
}