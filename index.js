const listBooks = document.querySelector('.books-list');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const inputBook = {};
let books = [];

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

function removeBook(book) {
  const result = books.filter((b) => b !== book);
  books = result;
  populateFields();
}

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
      removeBook(book);
      listBooks.removeChild(bookDiv);
    });
    return listBooks;
  });
};

const addBook = (newBook) => {
  books.push(newBook);
  populateFields();
  displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

// The functions below displays the new entries,  an store to
// local storage
displayBooks();
populateFields();