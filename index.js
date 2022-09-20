const listBooks = document.querySelector('.books-list');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

class Book {
  constructor(title = "", author = "") {
    this.title = title;
    this.author = author;
  }
}

class bookList {
  constructor(books = []) {
    this.books = books;
  }

  addBook(newBook) {
    this.books.push(newBook);
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  }

  removeBook(book) {
    let result = this.books.filter((b) => b !== book);
    this.books = result;
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  }
}

// check if it is needed to insert books declaration inside a block or function
let books = [];
// check if it is needed to insert books declaration inside a block or function

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

const list = new bookList(books);
const inputBook = new Book();

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  list.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
  displayBooks();
});

const displayBooks = () => {
  listBooks.innerHTML = '';
  books.map((book) => {
    const bookDiv = document.createElement('div');
    const titleBook = document.createElement('p');
    const authorBook = document.createElement('p');
    titleBook.textContent = book.title;
    authorBook.textContent = book.author;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    const hrElementet = document.createElement('hr');
    bookDiv.appendChild(titleBook);
    bookDiv.appendChild(authorBook);
    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(hrElementet);
    listBooks.appendChild(bookDiv);

    deleteBtn.addEventListener('click', () => {
      list.removeBook(book);
      listBooks.removeChild(bookDiv);
    });
    return listBooks;
  });
};

displayBooks();