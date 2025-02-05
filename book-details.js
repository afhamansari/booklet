// book-details.js
document.addEventListener("DOMContentLoaded", () => {
  // Extract the ID from the URL
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (!bookId) {
    document.body.innerHTML = "<p>Book not found.</p>";
    return;
  }

  // Fetch book data
  fetch("books.json")
    .then((response) => response.json())
    .then((books) => {
      const book = books.find((b) => b.id == bookId);

      if (!book) {
        document.body.innerHTML = "<p>Book not found.</p>";
        return;
      }

      // Populate the page
      document.title = book.title;
      const container = document.createElement("div");
      container.style.maxWidth = "400px";
      container.style.margin = "0 auto";
      container.style.padding = "20px";
      container.style.fontFamily = "Roboto, sans-serif";

      // Cover Image
      const cover = document.createElement("img");
      cover.src = book.cover;
      cover.alt = book.title;
      cover.style.width = "100%";
      cover.style.borderRadius = "8px";
      container.appendChild(cover);

      // Title and Author
      const title = document.createElement("h2");
      title.textContent = book.title;
      title.style.marginTop = "20px";
      container.appendChild(title);

      const author = document.createElement("p");
      author.textContent = `Author: ${book.author}`;
      container.appendChild(author);

      // Pages and Description
      const pages = document.createElement("p");
      pages.textContent = `Pages: ${book.pages}`;
      container.appendChild(pages);

      const description = document.createElement("p");
      description.textContent = book.description;
      container.appendChild(description);

      // Buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginTop = "20px";

      const backButton = document.createElement("button");
      backButton.textContent = "Back";
      backButton.style.padding = "10px 20px";
      backButton.style.borderRadius = "8px";
      backButton.style.border = "none";
      backButton.style.cursor = "pointer";
      backButton.style.backgroundColor = "#ddd";
      backButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });

      const actionButton = document.createElement("button");
      actionButton.textContent = book.availability === "available" ? "Get" : "Unavailable";
      actionButton.style.padding = "10px 20px";
      actionButton.style.borderRadius = "8px";
      actionButton.style.border = "none";
      actionButton.style.cursor = book.availability === "available" ? "pointer" : "not-allowed";
      actionButton.style.backgroundColor = book.availability === "available" ? "green" : "red";
      actionButton.style.color = "white";

      if (book.availability === "available") {
        actionButton.addEventListener("click", () => {
          window.location.href = "book-request-form.html";
        });
      }

      buttonContainer.appendChild(backButton);
      buttonContainer.appendChild(actionButton);

      container.appendChild(buttonContainer);

      // Append container to the body
      document.body.appendChild(container);
    })
    .catch((error) => {
      document.body.innerHTML = "<p>Failed to load book details.</p>";
      console.error(error);
    });
});
