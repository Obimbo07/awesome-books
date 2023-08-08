let books = [

];

const booksSection = document.getElementById('available-books');
const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('Author');

bookForm.addEventListener('click', () => {
  const bookData = {
    bookTitle: bookTitle.value,
    bookAuthor: bookAuthor.value,
  };
  localStorage.setItem('bookData', JSON.stringify(bookData));
});

window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('bookData'));
  if (data) {
    bookTitle.value = data.bookTitle;
    bookAuthor.value = data.bookAuthor;
  }
});

function displayBooks() {
  booksSection.innerHTML = '';

  books.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>${book.Author}</p>
        `;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    bookElement.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
      books = books.filter((_book, i) => i !== index);
      displayBooks();
    });
    booksSection.appendChild(bookElement);
  });
}
displayBooks();
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('Author');

  const newBook = {
    title: bookTitle.value,
    Author: bookAuthor.value,
  };
  books.push(newBook);
  displayBooks();
  bookTitle.value = '';
  bookAuthor.value = '';
});
