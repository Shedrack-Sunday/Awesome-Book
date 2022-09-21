const listBooks = document.querySelector('.list-books');
const booksContainer = document.querySelector('.books-wrapper');
const form = document.querySelector('.form-input');
const contact = document.querySelector('.contact');
const [title, author] = form.elements;

const listPage = document.querySelector('.list-page');
const addNewPage = document.querySelector('.add-new-page');
const contactPage = document.querySelector('.contact-page');

const inputBook = {};
let books = new Array([]);

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    populateFields();
    this.displayBooks();
  };

  static displayBooks = () => {
    listBooks.innerHTML = '';
    books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      listBooks.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        listBooks.removeChild(bookDiv);
      });
      return listBooks;
    });
  };
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

Book.displayBooks();
populateFields();

const settings = {
  list: {
    display: ['block', 'none', 'none'],
    color: ['#0000ff', '#333', '#333'],
  },
  addNew: {
    display: ['none', 'block', 'none'],
    color: ['#333', '#0000ff', '#333'],
  },
  contact: {
    display: ['none', 'none', 'block'],
    color: ['#333', '#333', '#0000ff'],
  },
};

/* eslint-disable */

const populateSettings = (i) => {
  booksContainer.style.display = i.display[0];
  form.style.display = i.display[1];
  contact.style.display = i.display[2];

  listPage.style.color = i.color[0];
  addNewPage.style.color = i.color[1];
  contactPage.style.color = i.color[2];
};

/* eslint-enable */

listPage.addEventListener('click', () => {
  populateSettings(settings.list);
});

addNewPage.addEventListener('click', () => {
  populateSettings(settings.addNew);
});

contactPage.addEventListener('click', () => {
  populateSettings(settings.contact);
});

populateSettings(settings.addNew);