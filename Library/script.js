const gridContainer = document.querySelector(".grid-container");

const bookDialog = document.querySelector('#book-dialog');
const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const cancelBtn = document.querySelector('#cancel-btn');
const newBookBtn = document.querySelector('#new-book-btn');

const readDialog = document.querySelector('#read-dialog');
const readForm = document.querySelector('#read-form');
const readStatus = document.querySelector('#read-status');
const updateBtn = document.querySelector('#update-btn');
const cancelReadBtn = document.querySelector('#cancel-read-btn');


newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
})

cancelBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.close();
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks();
    bookForm.reset();
    bookDialog.close();
})

readFormInput = '';

readForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateReadStatus(readFormInput);
})

cancelReadBtn.addEventListener('click', () => {
    readForm.reset();
    readDialog.close();
})

gridContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        discardBook(e);
        displayBooks();
    }

    if (e.target.classList.contains('read-status')) {
        readDialog.showModal();
        readFormInput = e.target.id;
    }
})

let myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
    const myBook = new Book(title, author, pages, read);
    const uniqueId = crypto.randomUUID();
    myBook.id = uniqueId;
    myLibrary.push(myBook);
}

function displayBooks() {
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
    for (const item of myLibrary) {
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const read = document.createElement('div');
        read.classList.add('read-status');
        read.id = item.id;

        // add remove button
        const removeBtn = document.createElement('div');
        removeBtn.classList.add('remove-btn');
        removeBtn.id = item.id;
        
        title.textContent = item.title;
        author.textContent = item.author;
        pages.textContent = item.pages;
        read.textContent = item.read();
        removeBtn.textContent = '❌';

        gridContainer.append(title, author, pages, read, removeBtn);
    }
}

function discardBook(e) {
    myLibrary = myLibrary.filter(item => item.id !== e.target.id);
}

function updateReadStatus(readFormInput) {
    const bookToUpdate = myLibrary.find(item => item.id === readFormInput);
    bookToUpdate.isRead = readStatus.checked;
    displayBooks();
    readForm.reset();
    readDialog.close();
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true)
addBookToLibrary("1984", "George Orwell", 328, false)
addBookToLibrary("Short", "A. Smith", 45, false)
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true)
addBookToLibrary("Rich Dad Poor Dad", "Thomas Lee", 482, false)

displayBooks();