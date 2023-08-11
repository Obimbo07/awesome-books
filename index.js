class BookLibrary {
  constructor() {
    this.books = [];
    this.booksSection = document.getElementById('section1');
    this.bookForm = document.getElementById('book-form');
    this.bookTitle = document.getElementById('book-title');
    this.bookAuthor = document.getElementById('Author');

    this.loadBooksFromLocalStorage();
    this.displayBooks();

    this.bookForm.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  loadBooksFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('bookData'));
    if (data) {
      this.bookTitle.value = data.bookTitle;
      this.bookAuthor.value = data.bookAuthor;
    }
  }

  saveBooksToLocalStorage() {
    localStorage.setItem(
      'bookData',
      JSON.stringify({
        bookTitle: this.bookTitle.value,
        bookAuthor: this.bookAuthor.value,
      }),
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const newBook = {
      title: this.bookTitle.value,
      Author: this.bookAuthor.value,
    };

    this.addBook(newBook);
    this.clearForm();
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooksToLocalStorage();
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.displayBooks();
  }

  displayBooks() {
    this.booksSection.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
                <h2>"${book.title}" by</h2><p>${book.Author}</p>
            `;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      bookElement.appendChild(removeButton);

      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      this.booksSection.appendChild(bookElement);
    });
  }

  clearForm() {
    this.bookTitle.value = '';
    this.bookAuthor.value = '';
  }
}
const library = new BookLibrary();
library.displayBooks();
const currentDate = new Date();
const options = {
  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
};
const formattedDate = currentDate.toLocaleDateString('en-US', options);
const displayDate = document.getElementById('date-display');
displayDate.textContent = formattedDate;

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  function showSection(sectionId) {
    contentSections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      const targetSectionId = event.currentTarget.getAttribute('data-target');
      showSection(targetSectionId);
    });
  });

  showSection(contentSections[0].id);
});
