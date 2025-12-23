const myLibrary = [
    new Book('Steve Jobs', 'Walter Isaacson', 310, true),
    new Book('HTML5 Programming', 'Peter Lubbers, Brian Albers, and Frank Salim', 1120, false)
];

function Book(title, author, pages, read) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.removeBookFromLibrary = function() {
        myLibrary = myLibrary.filter(book => book.id !== this.id);
    }
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    console.log(myLibrary);
    const libraryContainer = document.getElementsByClassName('books')[0];
    libraryContainer.innerHTML = ''; // Clear existing content

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-book-id', book.id);
        bookDiv.innerHTML = `
            <div class="book__text">
                <h2>${book.title}</h2>
                <p>
                    By ${book.author}, ${book.pages} Pages, ${book.read ? 'Read!' : 'Not Read!'}
                </p>
            </div>

            <div class="book__links">
                <img class="book-icon remove-book" src="./icons/book-remove.svg"></img>
                <img class="book-icon" src="./icons/eye-plus-outline.svg"></img>
            </div>
        `;

        libraryContainer.appendChild(bookDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayLibrary();
    const dialog = document.querySelector('dialog');
    const showBtn = document.getElementsByClassName('add_book')[0];
    const closeBtn = document.getElementById('cancel-btn');
    
    showBtn.addEventListener('click', () => {
        dialog.showModal();
    });
    
    closeBtn.addEventListener('click', () => {
        dialog.close();
    });
    
    const form = document.getElementById('book-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = form.elements['title'].value;
        const author = form.elements['author'].value;
        const pages = form.elements['pages'].value;
        const read = form.elements['read-status'].value === 'read';
        addBookToLibrary(title, author, pages, read);
        displayLibrary();
        form.reset();
    });
});