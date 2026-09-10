const gridContainer = document.querySelector(".grid-container");

const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("Short", "A. Smith", 45, false),
    new Book("Edge & Case #101!", "Special Author-Name", 9999, true)
];

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
    for (const item of myLibrary) {
        
    }
}

// Testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
//const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(myLibrary[0].id);