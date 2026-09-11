const gridContainer = document.querySelector(".grid-container");

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead,
    this.read = function() {
        if (this.isRead) {
            return `read`;
        }
        return `not read yet`;
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
    readStatusHead.textContent = 'Read Status';

    gridContainer.append(titleHead, authorHead, pagesHead, readStatusHead, lastHead);

    // create book data
    for (const item of myLibrary) {
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const readStatus = document.createElement('div');

        // add remove button
        const removeBtn = document.createElement('div');
        removeBtn.classList.add('remove-btn');
        removeBtn.id = item.id;
        
        title.textContent = item.title;
        author.textContent = item.author;
        pages.textContent = item.pages;
        readStatus.textContent = item.isRead;
        removeBtn.textContent = '❌';

        gridContainer.append(title, author, pages, readStatus, removeBtn);
    }
}

function addRemoveBtnListener() {
    gridContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            discardBook(e);
            displayBooks();
        }
    })
}

function discardBook(e) {
    myLibrary = myLibrary.filter(item => item.id !== e.target.id);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true)
addBookToLibrary("1984", "George Orwell", 328, false)
addBookToLibrary("Short", "A. Smith", 45, false)
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true)

displayBooks();
addRemoveBtnListener()