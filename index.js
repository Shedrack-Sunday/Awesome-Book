const listBooks = document.querySelector('.books-list');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const inputBook = {};

// ------ CLASSES ------
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// ------ GROUP THESE METHODS IN A CLASS ------

class bookList {
  constructor(books = []) {
    this.books = books;
  }

  addBook(newBook) {
    this.books.push(newBook);
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  }
}

//Activate interaction wiht webpage

let books = [];

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

const list = new bookList(books);

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


// -------MODIFY THE CODE BELOW THIS LINE----------------------------------------------
// -------MODIFY THE CODE BELOW THIS LINE----------------------------------------------
// -------MODIFY THE CODE BELOW THIS LINE----------------------------------------------



// DFunction to remove books
// function removeBook(book) {
//   const result = books.filter((b) => b !== book);
//   books = result;
//   populateFields();
// }

// Function to dynamicaaly add books
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

    // deleteBtn.addEventListener('click', () => {
    //   removeBook(book);
    //   listBooks.removeChild(bookDiv);
    // });
    return listBooks;
  });
};



// The functions below displays the new entries,  an store to
// local storage
displayBooks();