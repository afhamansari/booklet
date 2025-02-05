document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");

    // Fetch event data from the JSON file
    fetch("events.json")
        .then((response) => response.json())
        .then((events) => {
            events.forEach((event) => {
                // Create a card for each event
                const eventCard = document.createElement("div");
                eventCard.classList.add("event");

                eventCard.innerHTML = `
                    <img src="${event.photo}" alt="${event.name}">
                    <h3>${event.name}</h3>
                    <p class="event-date">Date: ${event.date}</p>
                    <p>${event.description}</p>
                `;

                // Append the card to the container
                eventsContainer.appendChild(eventCard);
            });
        })
        .catch((error) => {
            console.error("Error loading events:", error);
            eventsContainer.innerHTML = "<p>Unable to load events at the moment.</p>";
        });
});
