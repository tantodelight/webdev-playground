const gridContainer = document.querySelector(".grid-container");

const bookDialog = document.querySelector('.book-dialog');
const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const cancelBtn = document.querySelector('#cancel-btn');
const newBookBtn = document.querySelector('.new-book-btn');

const readDialog = document.querySelector('.read-dialog');
const readForm = document.querySelector('#read-form');
const readStatus = document.querySelector('#read-status');
const updateBtn = document.querySelector('#update-btn');
const cancelReadBtn = document.querySelector('#cancel-read-btn');

class Library {
    #myLibrary = [];
    
    addBook(title, author, pages, read) {
        const myBook = new Book(title, author, pages, read);
        const uniqueId = crypto.randomUUID();
        myBook.id = uniqueId;
        this.#myLibrary.push(myBook);
    }
    
    discardBook(bookId) {
        this.#myLibrary = this.#myLibrary.filter(item => item.id !== bookId);
    }
    
    updateReadStatus(readFormInput) {
        const bookId = readFormInput.replace('book-id-', '');
        const bookToUpdate = this.#myLibrary.find(item => item.id === bookId);
        bookToUpdate.isRead = readStatus.checked;
        library.displayBooks();
        readForm.reset();
        readDialog.close();
    }

    displayBooks() {
        gridContainer.textContent = '';
    
        // create column heads
        const titleHead = document.createElement('div');
        const authorHead = document.createElement('div');
        const pagesHead = document.createElement('div');
        const readStatusHead = document.createElement('div');
        const lastHead = document.createElement('div');
    
        titleHead.textContent = 'Title';
        authorHead.textContent = 'Author';
        pagesHead.textContent = 'Pages';
        readStatusHead.textContent = 'Read';
    
        gridContainer.append(titleHead, authorHead, pagesHead, readStatusHead, lastHead);
    
        // create book data
        for (const item of this.#myLibrary) {
            const title = document.createElement('div');
            const author = document.createElement('div');
            const pages = document.createElement('div');
            const read = document.createElement('div');
            read.classList.add('read-status');
            read.classList.add(`book-id-${item.id}`);
    
            // add remove button
            const removeBtn = document.createElement('div');
            removeBtn.classList.add('remove-btn');
            removeBtn.classList.add(`book-id-${item.id}`);
            
            title.textContent = item.title;
            author.textContent = item.author;
            pages.textContent = item.pages;
            read.textContent = item.read();
            removeBtn.textContent = '❌';
    
            gridContainer.append(title, author, pages, read, removeBtn);
        }
    }
}

newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
})

cancelBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.close();
})

// submit new book handler
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    library.addBook(title.value, author.value, pages.value, read.checked);
    library.displayBooks();
    bookForm.reset();
    bookDialog.close();
})

let readFormInput = '';

readForm.addEventListener('submit', (e) => {
    e.preventDefault();
    library.updateReadStatus(readFormInput);
})

cancelReadBtn.addEventListener('click', () => {
    readForm.reset();
    readDialog.close();
})

// discard book handler
gridContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const bookClass = [...e.target.classList].find(className => className.startsWith('book-id-'));
        const bookId = bookClass.replace('book-id-', '');
        library.discardBook(bookId);
        library.displayBooks();
    }

    if (e.target.classList.contains('read-status')) {
        readDialog.showModal();
        readFormInput = [...e.target.classList].find(className => className.startsWith('book-id-'));
    }
})

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead,
    this.read = function() {
        if (this.isRead) {
            return `Yes`;
        }
        return `No`;
    }
    this.info =  function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read()}.`;
    } 
}

const library = new Library();

// add placeholder books
library.addBook("The Hobbit", "J.R.R. Tolkien", 310, true)
library.addBook("1984", "George Orwell", 328, false)
library.addBook("Short", "A. Smith", 45, false)
library.addBook("To Kill a Mockingbird", "Harper Lee", 281, true)
library.addBook("Rich Dad Poor Dad", "Thomas Lee", 482, false)

library.displayBooks();