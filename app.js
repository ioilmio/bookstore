class Book {
    constructor(author, title, pages, status) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.status = status;
    }
}


// Event displayformclass UI {
    class UI {    
    static displayBooks() {
        const library = [
            {
                author: 'book1',
                title: 'title1',
                pages: 10,
                status: 'read',
            },
            {
                author: 'book2',
                title: 'title2',
                pages: 20,
                status: 'read',
            },
        ];

        library.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const section = document.querySelector('#bookDisplay');
        const card = document.createElement('div');

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
            status.id = 'status';
            return status;
        };

        const status = statusBtnHtml();

        const bookStatus = (status, book) => {
            const changeStatus = book.status === 'read' ? book.status = 'unread' : book.status = 'read';
            status.onclick = () => {
                //   localStorage.setItem('library', JSON.stringify(bookLibrary));
                status.textContent = book.status;
                return changeStatus;
            };
        };


        const deleteBook = () => {
            const deleteBookBtn = document.createElement('button');
            deleteBookBtn.textContent = 'delete book';
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

    static addBooks(e) {
        const author = document.getElementById('author').value;
        const title = document.querySelector('#title').value;
        const pages = document.getElementById('pages').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        
        const book = new Book(author, title, pages, status);
        
        console.log(book);
        e.preventDefault();
        UI.addBookToLibrary(book);
        UI.clearFields();
    }
}

const form = document.getElementById('form');

form.addEventListener('submit', () => UI.addBooks(event));

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


