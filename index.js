document.addEventListener("DOMContentLoaded", () => {
    let booksData = [];
    const bookGrid = document.getElementById("book-grid");
    const selectedGenre = document.getElementById("selected-genre");
    const genreDropdown = document.getElementById("genre-dropdown");
  
    // Function to render books in the grid
    function renderBooks(books) {
      bookGrid.innerHTML = ""; // Clear the grid
      books.forEach((book) => {
        const bookBox = document.createElement("div");
        bookBox.classList.add("book-box");
  
        const img = document.createElement("img");
        img.src = book.cover;
        img.alt = book.title;
  
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
  
        const title = document.createElement("h3");
        title.textContent = book.title;
  
        const author = document.createElement("p");
        author.textContent = book.author;
  
        // Create the availability box
        const availabilityBox = document.createElement("div");
        availabilityBox.classList.add("availability-box");
        // Add the appropriate modifier class based on availability
        if (book.availability === "available") {
          availabilityBox.classList.add("availability-available");
        } else {
          availabilityBox.classList.add("availability-unavailable");
        }
        availabilityBox.textContent = book.availability;
  
        // Append title, author, and availability box to the book info container
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(availabilityBox);
  
        bookBox.appendChild(img);
        bookBox.appendChild(bookInfo);
  
        // Navigate to book-details.html with the book's id
        bookBox.addEventListener("click", () => {
          window.location.href = `book-details.html?id=${book.id}`;
        });
  
        bookGrid.appendChild(bookBox);
      });
    }
  
    // Function to populate the genre dropdown
    function populateGenreDropdown(books) {
      // Get unique genres from books, add "All Genres" as default
      const genres = ["All Genres", ...new Set(books.map((book) => book.genre))];
  
      // Clear any existing dropdown items
      genreDropdown.innerHTML = "";
  
      genres.forEach((genre) => {
        const li = document.createElement("li");
        li.textContent = genre;
        li.addEventListener("click", () => {
          selectedGenre.textContent = genre;
          toggleDropdown(); // Close the dropdown
          // Filter the books based on the selected genre
          if (genre === "All Genres") {
            renderBooks(booksData);
          } else {
            const filteredBooks = booksData.filter((book) => book.genre === genre);
            renderBooks(filteredBooks);
          }
        });
        genreDropdown.appendChild(li);
      });
    }
  
    // Toggle dropdown open/close
    function toggleDropdown() {
      genreDropdown.classList.toggle("open");
    }
  
    // Set event listener on selected genre to open dropdown
    selectedGenre.addEventListener("click", toggleDropdown);
  
    // Fetch the book data from books.json
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        booksData = books;
        // Render all books by default
        renderBooks(booksData);
        // Populate dropdown with available genres
        populateGenreDropdown(booksData);
      })
      .catch((error) => console.error("Error fetching books:", error));
  });
  