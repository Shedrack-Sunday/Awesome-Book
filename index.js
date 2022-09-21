const listBooks = document.querySelector('.list-books');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

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

// ------- EVENT LISTENERS ------- //

const listPage = document.querySelector('.list-page');
const addNewPage = document.querySelector('.add-new-page');
const contactPage = document.querySelector('.contact-page');

listPage.addEventListener('click', () => {
  document.querySelector('.list-books').style.display = 'block';
  document.querySelector('.form-input').style.display = 'none';
  document.querySelector('.contact').style.display = 'none';
});

addNewPage.addEventListener('click', () => {
  document.querySelector('.list-books').style.display = 'none';
  document.querySelector('.form-input').style.display = 'block';
  document.querySelector('.contact').style.display = 'none';
});

contactPage.addEventListener('click', () => {
  document.querySelector('.list-books').style.display = 'none';
  document.querySelector('.form-input').style.display = 'none';
  document.querySelector('.contact').style.display = 'block';
});
